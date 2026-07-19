import express from "express";

import { extractClaims } from "../services/claimextracter";
import { verifyclaims } from "../services/verifyclaims";

import { retrieveHybrid } from "../retrieval/hybridretrieval";
import { generateGroqResponse } from "../services/groqservice";

import { QueryExpansionService } from "../services/queryExpansion";
import { rerankFacts } from "../services/rerank";
import { debug } from "../utils/logger";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    // STEP 1: Query Expansion
    const expandedQuery =
      new QueryExpansionService().expand(prompt);

    // STEP 2: Retrieve Context
    const retrievedContext =
      await retrieveHybrid(expandedQuery);

    debug(
      "Hybrid Documents",
      retrievedContext.map((doc: any) => ({
        source: doc.source,
        type: doc.type,
        preview: doc.text?.slice(0, 120)
      }))
    );

    // STEP 3: Rerank
    const finalContext = retrievedContext;
    /*const finalContext =
  new RerankService().rerank(
    expandedQuery,
    retrievedContext.filter(
      (item): item is string => item !== null
    )
  );*/ 

    debug("Pipeline",{
      userQuery: prompt,
       expandedQuery,
        retrievedContext,
        finalContext
      });

    // STEP 4: Grounded Prompt
    const groundedPrompt = `
You are a factual AI assistant.

Answer ONLY using facts found in the provided context.

Rules:
1. Use any relevant fact present in the context.
2. If multiple facts are relevant, combine them.
3. Do not use outside knowledge.
4. Do not invent information.
5. If the answer is not supported by the context, respond exactly:
"The provided context does not contain enough information."

Context:
${finalContext
    .map((doc: any) => doc.text)
    .join("\n\n")}

Question:
${prompt}

Answer:
`;

   debug("Grounded Prompt", groundedPrompt);
    // STEP 5: Generate Answer
    const llmResponse =
      await generateGroqResponse(groundedPrompt);

    if (!llmResponse) {
      throw new Error("LLM response was null");
    }

    debug("LLM Response", llmResponse);

    // STEP 6: Extract Claims
    const claims =
      await extractClaims(prompt, llmResponse);

    debug("Extracted Claims", claims);

    // STEP 7: Verify Claims
    const verifiedClaims =
      await verifyclaims(claims, retrievedContext);

    const totalClaims = verifiedClaims.length;

    const verifiedCount = verifiedClaims.filter(
      claim => Boolean(claim && claim.verified)
    ).length;
    
    const hallucinationScore = totalClaims === 0 ?
    0: Math.round(
      ((totalClaims - verifiedCount) / totalClaims) * 100
    );
    debug("Verified Claims", verifiedClaims);

    // STEP 8: Return Response
    return res.json({
      success: true,
      response: llmResponse,
      claims: verifiedClaims,
      hallucinationScore: hallucinationScore,
      verifiedClaims: verifiedCount,
      totalClaims: totalClaims
    });

  } catch (error: any) {

    console.error("\nFULL ERROR:");
    console.error(error.response?.data);
    console.error(error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
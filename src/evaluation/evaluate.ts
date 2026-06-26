import axios from "axios";
import acquisitions from "./datasets/acqusitions.json";

async function runEvaluation() {

    let passed = 0;

    console.log("\n========== HalluciShield Evaluation ==========\n");

    for (const test of acquisitions) {

        const response = await axios.post(
            "http://localhost:3000/generate",
            {
                prompt: test.question
            }
        );

        const data = response.data;

        const expected =
            test.expected
                .toLowerCase()
                .trim();

        // Get only VERIFIED claims
        const verifiedClaims =
    data.claims
        .filter((claim: any) => claim.verified)
        .map((claim: any) =>
            (
                claim.normalizedClaim ??
                claim.claim
            )
            .toLowerCase()
            .trim()
        );

        const success =
            verifiedClaims.some((claim: string) =>
                claim.includes(expected) ||
                expected.includes(claim)
            );

        console.log("----------------------------------------");
        console.log(`Question : ${test.question}`);
        console.log(`Expected : ${test.expected}`);
        console.log(`Response : ${data.response}`);

        console.log("\nVerified Claims:");

        verifiedClaims.forEach((claim: string) =>
            console.log(`✓ ${claim}`)
        );

        console.log(
            `\nHallucination Score : ${data.hallucinationScore}%`
        );

        console.log(
            success
                ? "✅ PASS"
                : "❌ FAIL"
        );

        if (success)
            passed++;
    }

    console.log("\n========================================");
    console.log(`Passed : ${passed}/${acquisitions.length}`);
    console.log(
        `Accuracy : ${(
            (passed / acquisitions.length) *
            100
        ).toFixed(2)}%`
    );
    console.log("========================================\n");
}

runEvaluation();
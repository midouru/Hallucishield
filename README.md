# HalluciShield 🛡️
**AI Hallucination Detection Middleware**
 
HalluciShield is a real-time middleware layer that intercepts LLM responses, extracts factual claims, and verifies them against a trusted knowledge base — before anything reaches the user.
 
---
 
## The Problem
 
LLMs frequently produce responses that *sound* convincing but contain fabricated information:
 
| Hallucinated Claim | Reality |
|---|---|
| "Microsoft acquired GitHub in 2025" | Acquisition was in 2018 |
| "Google was founded in 2010" | Founded in 1998 |
| "Aspirin cures cancer" | Medically false |
 
This is especially dangerous in **healthcare**, **finance**, **legal systems**, and **enterprise assistants**.
 
---
 
## How It Works
 
```
User Prompt → LLM (Phi3) → Claim Extraction → Embedding Generation
    → Cosine Similarity Search → Knowledge Base Verification
        → Confidence Scoring → Verification Report
```
 
1. **Intercept** — LLM response is captured before reaching the user
2. **Extract** — Factual claims are parsed from the response
3. **Embed** — Claims are converted to semantic vectors via `nomic-embed-text`
4. **Verify** — Vectors are compared against a trusted knowledge base
5. **Score** — Each claim gets a confidence score and risk flag
---
 
## Example
 
**Input prompt:** *"When did Microsoft acquire GitHub?"*
 
**LLM response:** *"Microsoft acquired GitHub in 2025 for $10 billion."*
 
**HalluciShield output:**
```json
{
  "claim": "Microsoft acquired GitHub in 2025",
  "verified": false,
  "confidence": 0.21,
  "evidence": "Microsoft acquired GitHub in June 2018 for $7.5 billion.",
  "risk": "HIGH"
}
```
 
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| LLM | Ollama (Phi3 Mini) |
| Embeddings | nomic-embed-text |
| Verification | Cosine Similarity |
 
---
 
## Project Structure
 
```
src/
├── knowledge/
│   ├── facts.json            # Trusted knowledge base
│   └── factembeddings.ts     # Pre-compute & cache embeddings
├── services/
│   ├── ollamaservice.ts      # LLM inference
│   ├── claimextracter.ts     # Parse claims from responses
│   ├── embeddingservice.ts   # Generate text embeddings
│   └── verifyclaims.ts       # Run verification pipeline
├── utils/
│   └── cosinesimilarity.ts   # Vector math
├── routes/
│   └── index.ts
└── server.ts
```
 
---
 
## Getting Started
 
**Prerequisites:** Node.js v18+, [Ollama](https://ollama.ai/) running locally.
 
```bash
# Pull required models
ollama pull phi3:mini
ollama pull nomic-embed-text
 
# Install & run
npm install
cp .env.example .env
npm run dev
```
 
---
 
## API
 
### `POST /verify`
```json
// Request
{ "prompt": "When did Microsoft acquire GitHub?" }
 
// Response
{
  "response": "Microsoft acquired GitHub in 2018 for $7.5 billion.",
  "claims": [
    {
      "claim": "Microsoft acquired GitHub in 2018",
      "verified": true,
      "confidence": 0.94,
      "risk": "LOW"
    }
  ]
}
```
 
---
 
## Roadmap
 
- [x] Local LLM inference (Phi3 + Ollama)
- [x] Claim extraction + semantic verification
- [ ] ChromaDB vector database integration
- [ ] RAG verification (PDFs, documents, research papers)
- [ ] Real-time evidence retrieval (Wikipedia, trusted APIs)
- [ ] Full audit trail + production risk scoring
---

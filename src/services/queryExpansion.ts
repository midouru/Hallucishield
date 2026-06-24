// services/queryExpansionService.ts

export class QueryExpansionService {
  private expansions: Record<string, string> = {
    aws: "amazon web services aws",
    azure: "microsoft azure",
    gcp: "google cloud platform",
    github: "github code repository platform",
    youtube: "youtube video sharing platform",
    openai: "openai artificial intelligence company"
  };

  expand(query: string): string {
    let expanded = query.toLowerCase();

    Object.entries(this.expansions).forEach(([key, value]) => {
      if (expanded.includes(key)) {
        expanded += ` ${value}`;
      }
    });

    return expanded;
  }
}
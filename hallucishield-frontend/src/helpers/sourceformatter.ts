export function getSourceName(url: string) {

    if (!url) return "Unknown";

    try {

        const host =
            new URL(url)
                .hostname
                .replace("www.","");

        if(host.includes("wikipedia"))
            return "📄 Wikipedia";

        if(host.includes("britannica"))
            return "📚 Britannica";

        if(host.includes("github"))
            return "💻 GitHub";

        if(host.includes("youtube"))
            return "▶️ YouTube";

        return "🌐 " + host;

    }

    catch{

        return "📄 Source";

    }

}
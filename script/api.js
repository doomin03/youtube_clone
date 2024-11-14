export const _url = {
    seachList: function getSeachList(searchQuery) {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${'AIzaSyDUJCwlRdInVNeUVYnd121PzIpS5LRP6H4'}&part=snippet&type=video&q=${searchQuery}&maxResults=10`;
        return url;
    },
};

export class Parser {
    async getResult(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
            const data = await response.json();

            const results = data.items.map((item) => ({
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url, // 높은 해상도 사용
                channelTitle: item.snippet.channelTitle,
            }));

            return results;
        } catch (error) {
            return [];
        }
    }
}

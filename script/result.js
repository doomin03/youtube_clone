import { _url, Parser } from './api.js';

const params = new URLSearchParams(window.location.search);
const searchInput = params.get('input');

const url = _url.seachList(searchInput);
const parser = new Parser();

async function displayResults() {
    try {
        const results = await parser.getResult(url);

        const container = document.getElementById('results-container');

        if (results.length === 0) {
            container.innerHTML = '<p>검색 결과가 없습니다.</p>';
            return;
        }

        results.forEach((item) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
        
            const highRes = item.thumbnail;
            const mediumRes = item.thumbnail.replace('hqdefault', 'mqdefault'); // Replace high-quality with medium-quality if needed
        
            resultItem.innerHTML = `
                <img 
                    src="${highRes}" 
                    alt="${item.title}" 
                    class="thumbnail" 
                    srcset="${mediumRes} 1x, ${highRes} 2x"
                >
                <div class="info">
                    <p class="title">${item.title}</p>
                    <p class="channel">${item.channelTitle}</p>
                </div>
            `;
        
            container.appendChild(resultItem);
        });
    } catch (error) {
        console.error('오류 발생:', error);
        document.getElementById('results-container').innerHTML = '<p>데이터를 불러오는 중 오류가 발생했습니다.</p>';
    }
}

displayResults();

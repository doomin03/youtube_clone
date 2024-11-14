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
        
            resultItem.innerHTML = `
                <a href="https://www.youtube.com/watch?v=${item.videoId}" target="_blank">
                    <img src="${item.thumbnail}" alt="${item.title}" class="thumbnail">
                </a>
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

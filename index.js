import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.md에 작성될 text
 * 아래 <div></div> 요소는 이전에 작성했던 기술스택 아이콘 모음이다.
 * @type {string}
 */
let text = `
## TECH STACK
<div align="center">
       <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
       <img src="https://img.shields.io/badge/Rocky Linux-10B981?style=for-the-badge&logo=rockylinux&logoColor=white">
       <img src="https://img.shields.io/badge/VMware-607078?style=for-the-badge&logo=vmware&logoColor=white">
       <img src="https://img.shields.io/badge/Raspberry Pi-A22846?style=for-the-badge&logo=raspberrypi&logoColor=white">
</div>

## LATEST BLOG POSTS
`;

const parser = new Parser({
    headers : {
        Accept : 'application/rss+xml, application/xml, text:xml; q=0.1'
    }
});

(async () => {
    const feed = await parser.parseURL('https://mytilblog.tistory.com/rss'); // tistory RSS URL

    text += `<ul>`;

    // 반복문 돌면서 RSS에 있는 title과 link를 최신순으로 10개 추가한다.
    for (let i = 0; i < 10; i++) {
        const {title, link} = feed.items[i];

        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;

    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log('e = ', e);
    })

    console.log('UPDATE SUCCESS!');
});
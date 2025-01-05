import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.md에 작성될 text
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

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }
});

(async () => {
    const feed = await parser.parseURL('https://mytilblog.tistory.com/rss');
    text += `<ul>`;
    
    for (let i = 0; i < 10; i++) {
        const {title, link} = feed.items[i];
        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;
    
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
})();
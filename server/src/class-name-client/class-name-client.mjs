import axios from 'axios';

export class ClassNameClient {
    constructor() {
        this.httpClient = axios.create();
    }

    async getClassNameComponents() {
        const response = await this.httpClient.get('https://www.classnamer.org');
        const { data: htmlContent } = response;

        const htmlWithoutNewLines = htmlContent.replace(/(\r\n|\n|\r|\t)/gm, "");
        const result = this.extractClassNameFromHtml(htmlWithoutNewLines);

        return result;
    }

    extractClassNameFromHtml(rawHtml) {
        return rawHtml.split('<p id="classname">')[1].split('</p>')[0].split('<wbr>');
    }
}

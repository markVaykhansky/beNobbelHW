import { ClassNameClient } from "../class-name-client/class-name-client.mjs";

export class ClassNameGenerator {
    constructor() {
        this.classNameClient = new ClassNameClient();
    }

    async generateClassNames(amount) {
        const { classNameClient } = this;

        const classNameRequestsPromises = [...Array(amount).keys()].map(_ => classNameClient.getClassNameComponents());
        const allClassNames = await Promise.all(classNameRequestsPromises);
    
        return allClassNames;
    }
}
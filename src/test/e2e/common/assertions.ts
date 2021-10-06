const expect = require('chai').expect;

export class verificationMethods {
    async checkIfEqual(actual: unknown, expected: unknown, msg?: unknown): Promise<void> {
        try {
            await expect(actual, msg).to.eventually.equal(expected);
        } catch (err) {
            await expect(actual, msg).to.equal(expected);
        }
    }

    async checkIfTrue(actual: boolean, msg?: string): Promise<void> {
        await expect(actual, msg).to.be.true;
    }

    async checkIfContains(original: string, substring: string): Promise<void> {
        try {
            await this.checkIfTrue(original.includes(substring));
        } catch (error) {
            console.log(error);
            throw new error('Original String:' + original + ' does not contain substring:' + substring);
        }
    }
}

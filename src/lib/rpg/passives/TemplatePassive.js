class TemplatePassive {
    constructor ({ type }) {
        this.type = type
    }

    execute () {
        throw new Error('Passiva não implementada')
    }
}

module.exports = TemplatePassive
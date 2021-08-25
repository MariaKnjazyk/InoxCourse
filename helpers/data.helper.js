module.exports = {
    filledFields: (mail, password) => {
        return !!(mail && password);
    },

    normalizationData: (mail, password) => {
        return {normMail: mail.toLowerCase().trim(), normPass: password.trim()};
    },

    validateMail: (mail) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(mail);
    }
};
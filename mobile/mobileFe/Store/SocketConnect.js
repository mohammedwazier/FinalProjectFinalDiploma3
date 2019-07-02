// const status = 'dev';
const status = 'prod';
const link =
    status === 'prod'
        ? 'https://mohammedwazier.ddns.net'
        : 'http://192.168.1.4:5000';

module.export = {
    link,
};

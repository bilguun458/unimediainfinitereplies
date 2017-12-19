/* GET home page */
module.exports.index = function(req, res) {
    res.render('buses-list', {
        title: 'Байцаагч туслах',
        sidebar: "Энэхүү апп нь авто тээврийн байцаагчийн ажлыг хөнгөвчилхөд зориулсан апп юм. Нэмэлт боломжуудыг оруулахыг хүсвэл asdf@yahoo.com хаягаар холбогдоно уу.",
        sidebarTitle: "Энэ өдрийн мэнд!",
        buses: [{
            name: '1111УНА',
            date: '2017-11-22 10:30',
            from: 'Дархан',
            to: 'Улаанбаатар'
        }, {
            name: '2222УНА',
            date: '2017-11-22 14:00',
            from: 'Эрдэнэт',
            to: 'Улаанбаатар'
        }, {
            name: '3333УНА',
            date: '2017-11-22 15:30',
            from: 'Чойр',
            to: 'Улаанбаатар'
        }, {
            name: '4444УНА',
            date: '2017-11-22 16:45',
            from: 'Сайншанд',
            to: 'Улаанбаатар'
        }]
    });
};
module.exports.busInfo = function(req, res) {
    res.render('bus-info');
};

module.exports.angularApp = function(req, res){
    res.render('layout', { title: 'Байцаагч туслах' });
};
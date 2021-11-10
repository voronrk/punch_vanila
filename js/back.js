export const getBase_ = () => {

    let arData = [];

    const productType = {
                            БР: 'Бирка',
                            КН: 'Конверт',
                            КР: 'Коробка',
                            ОЖ: 'Обложка',
                            ОТ: 'Открытка',
                            ОЧ: 'Обечайка',
                            ПК: 'Пакет',
                            ПП: 'Папка',
                            Х: 'Хангер',
                            Э: 'Этикетка'
                        };
    const materials = {
        К: 'Картон',
        Г: 'Гофрокартон',
        Б: 'Бумага',
        П: 'Переплетные материалы',
    };
    const machines = ['ПТ', 'ML', 'STS'];
    const pics = ['БР-К-1-1.png',
                  'БР-К-2-2.png',
                  'КН-Б-2-3.png',
                  'КН-Б-2-4.png',
                  'КН-К-2-1.png',
                  'КН-К-2-2.png',
                  'КР-К-1-1.png',
                  'КР-К-2-2_дно.png',
                  'ОЖ-К-1-1.png',
                  'ОТ-К-1-1.png',
                  'ОТ-К-1-2.png',
                  'ОТ-К-1-3.png',
                  'ОТ-К-1-4.png',
                  'ОТ-К-1-8.png',
                  'ОТ-К-2-5.png',
                  'ОТ-К-2-6.png',
                  'ОТ-К-2-7.png',
                  'ОЧ-К-2-1.png',
                  'ПК-Б-2-1.png',
                  'ПК-Б-2-2.png',
                  'ПК-Б-2-3.png',
                  'ПП-К-1-1.png',
                  'ПП-К-2-2.png',
                  'ПП-К-2-3.png',
                  'ПП-К-2-4.png',
                  'ПП-К-2-5.png',
                  'Х-Б-2-1.png',
                  'Х-Б-2-2.png',
                  'Х-Б-2-3.png',
                  'Х-Б-2-4.png',
                  'Э-К-2-1.png',
                  'Э-К-2-2.png',
                  'Э-К-2-3.png'];

    pics.forEach((item) => {

        const arItem = item.split('-');

        let arTemp = {
            name: productType[arItem[0]],
            year: '',
            orderNum: '',
            materials: materials[arItem[1]],
            machine: machines[arItem[2]],
            knifeSizeWidth: '',
            knifeSizeLength: '',
            products: productType[arItem[0]],
            sizeWidth:'',
            sizeLength:'',
            sizeHeight:'',
            pic: `/pic/${item}`,
            pdf: '',
            calc: '',

            filter(arFilter) {
                let filter = true;
                if (Object.keys(arFilter).length==0) {
                    filter=true;
                } else {
                    for (let key in arFilter){
                        filter = filter && (arFilter[key].indexOf(this[key])>-1)
                    };

                };
                return filter;
            }            
        };        
        arData.push(arTemp);
    });

    return arData;
};

export async function savePunch(arPunch) {
    const data={'mtd': 'savePunch', 'data': arPunch};
    const response = await fetch ('back.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return await response.json();
};

export async function getBase() {
    const data={'mtd': 'getBase'};
    const response = await fetch ('back.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return await response.json();
};

export class Punch {
    constructor (data) {
        this.name = data['name'] ? data['name'] : '';
        this.year = data['year'] ? data['year'] : '';
        this.orderNum = data['ordernum'] ? data['ordernum'] : '';
        this.materials = data['materials'] ? data['materials'] : '';
        this.machines = data['machines'] ? data['machines'] : '';
        this.knifeSizeWidth = data['knifesizewidth'] ? data['knifesizewidth'] : '';
        this.knifeSizeLength = data['knifesizelength'] ? data['knifesizelength'] : '';
        this.products = data['products'] ? data['products'] : '';
        this.sizeWidth = data['sizewidth'] ? data['sizewidth'] : '';
        this.sizeLength = data['sizelength'] ? data['sizelength'] : '';
        this.sizeHeight = data['sizeheight'] ? data['sizeheight'] : '';
        this.pics = data['pics'] ? data['pics'] : '';
        this.pdf = data['pdf'] ? data['pdf'] : '';
        this.calc = data['calc'] ? data['calc'] : '';
    };
    

    filter(arFilter) {
        let filter = true;
        if (Object.keys(arFilter).length==0) {
            console.log('nofilter');
            return true;
        };
        for (let key in arFilter){
            if ((typeof(this[key])=='string') || (typeof(this[key])=='number')){
                filter = filter && (arFilter[key].indexOf(this[key])>-1)
            };
            if (typeof(this[key])=='object') {
                let filterTmp = false;
                for (let i=0;i<arFilter[key].length;i++) {
                    filterTmp = filterTmp || (arFilter[key][i].indexOf(this[key])>-1);
                };
                filter = filter && filterTmp;
            };
        };
        return filter;
    }            
};
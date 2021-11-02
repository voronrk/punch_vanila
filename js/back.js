export const getBase = () => {

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
    const machines = ['ПТ', 'МЛ', 'STS'];
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
                let filter = false;
                if (Object.keys(arFilter).length==0) {
                    filter=true;
                } else {
                    for (let key in arFilter){
                        console.log(this);
                        if (arFilter[key].indexOf(this[key])>-1) {
                            filter=true;
                        }
                    };
                };
                console.log(filter);
                return filter;
            }            
        };        
        arData.push(arTemp);
    });

    return arData;
};
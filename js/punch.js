export default class Punch {
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
            return true;
        };
        for (let key in arFilter){
            if (typeof(this[key])=='string') {
                filter = filter && (arFilter[key].indexOf(this[key])>-1)
            };
            if (typeof(this[key])=='number') {
                filter = filter && (arFilter[key][0] <= this[key]*1.1) && (arFilter[key][0] >= this[key]*0.9)
            };
            if (typeof(this[key])=='object') {
                let filterTmp = false;
                for (let i=0;i<arFilter[key].length;i++) {
                    filterTmp = filterTmp || (this[key].indexOf(arFilter[key][i])>-1);
                };
                filter = filter && filterTmp;
            };
        };
        return filter;
    };

    renderArray(arData) {
        let outString = '';
        arData.forEach(item => {
            outString += `${item}, `;
        });
        return outString.substring(0, outString.length-2);
    };
    
    card(arFilter) {
        if (this.filter(arFilter)) {
            const view = document.createElement('div');
            view.classList.add('box');
            view.innerHTML = `
                <article class="media">
                    <figure class="media-left">
                        <div class="image is-128x128">
                            <img class="card-image" src="pic/${this.pics[0]}">
                        </div>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <div class="has-text-weight-bold is-size-5">${this.name}</div>
                            <div>${this.renderArray(this.products)}</div>
                            <div class="columns">
                                <div class="column">
                                    <span class="has-text-weight-bold">Заказ № ${this.orderNum}/${this.year}</span>
                                    <br> Материал: ${this.renderArray(this.materials)}
                                    <br> Машина: ${this.renderArray(this.machines)}
                                </div>
                                <div class="column">
                                    <span class="has-text-weight-bold">Размеры изделия</span>
                                    <br>Длина, мм: ${this.sizeLength}
                                    <br>Ширина, мм: ${this.sizeWidth}
                                    <br>Высота, мм: ${this.sizeHeight}
                                </div>
                                <div class="column">
                                    <span class="has-text-weight-bold">Размер по ножам</span>
                                    <br>Длина, мм: ${this.knifeSizeLength}
                                    <br>Ширина, мм: ${this.knifeSizeWidth}
                                </div>
                            </div>                        
                        </div>
                    </div>
                    <div class="media-right">
                        <button class="button is-small">Редактировать</button>
                    </div>
                </article>
                `;
            view.addEventListener('click', (event) => {
                if (event.target.nodeName=='IMG') {
                    modal.querySelector('#modal-img').src = event.target.src;
                    modal.classList.add('is-active');
                };
                if (event.target.innerHTML=='Редактировать') {
                    console.log(this);
                };
    
            });
        return view;
        };
    };
};
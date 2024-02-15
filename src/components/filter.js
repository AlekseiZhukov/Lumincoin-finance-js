import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

export class Filter {
    _filterTemplate = '../templates/filter.html';

    constructor(callback) {
        this.today = new Date().toISOString().slice(0, 10);
        this.filterContentElement = null;
        this.data = null;
        this.dataFromInputElement = null;
        this.dataToInputElement = null;
        this.filterButtonElements = null;
        this.btnIntervalElement = null;
        this.btnTodayElement = null;
        this.activeFilterButton = 'today'
        this.callback = callback;
        this.init()
    }

    async init() {

        this.filterContentElement = document.getElementById('filter-content');
        this.filterContentElement.innerHTML = await fetch(this._filterTemplate).then(response => response.text());
        this.dataFromInputElement = document.getElementById('dateFrom');
        this.dataToInputElement = document.getElementById('dateTo');
        this.filterButtonElements = document.getElementsByClassName('btn-outline-secondary');
        this.btnIntervalElement = document.getElementById('interval');
        this.btnTodayElement = document.getElementById('today');
        this.btnTodayElement.classList.add('active_button_period')
        const that = this;

        this.dataFromInputElement.addEventListener('change', () => {
            that.changeInputsData();
        });
        this.dataToInputElement.addEventListener('change', () => {
            that.changeInputsData();
        });

        [].forEach.call(that.filterButtonElements, function (button) {
            button.addEventListener('click', function () {
                that.activeFilterButton = button.id;
                that.getData(button.id);
                [].forEach.call(that.filterButtonElements, function (button) {
                    if (button.id === that.activeFilterButton) {
                        button.classList.add('active_button_period');
                    } else {
                        button.classList.remove('active_button_period');
                    }
                })
            })
        })
        await this.getData('today')
    }

    async getData(period = 'all', callback = this.callback) {
        let queryString;
        if (period === 'interval') {
            if (this.dataFromInputElement.value && this.dataToInputElement.value)
                queryString = `/operations?period=interval&dateFrom=${this.dataFromInputElement.value}&dateTo=${this.dataToInputElement.value}`;
        } else if (period === 'today') {
            queryString = `/operations?period=interval&dateFrom=${this.today}&dateTo=${this.today}`;
        } else {
            queryString = '/operations?period=' + period;
        }
        try {
            const results = await CustomHttp.request(config.host + queryString);
            if (results) {
                if (results.error) {
                    throw new Error(results.error);
                }
                callback(results)
            } else {
                throw new Error('На данный период данных нет');
            }
        } catch (e) {
            console.log(e)
        }
    }

    changeInputsData() {
        if (this.dataFromInputElement.value && this.dataToInputElement.value) {
            this.btnIntervalElement.removeAttribute('disabled')
        } else {
            this.btnIntervalElement.setAttribute('disabled', 'disabled')
        }
    }

}
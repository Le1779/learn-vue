<template>
    <div>
        <p style="color: white; margin-bottom: 8px;">選擇人員</p>
        <div class="employee-selector-input" @click.stop="expandSelector">
            <input type="text" v-model="parentObject.searchKeyword" placeholder="輸入關鍵字">
            <div class="employee-selector-chips-container">
                <div class="employee-selector-chips">
                    <div class="chip" v-for="(item, i) in selectedItems">
                        {{item.employee_name}}
                    </div>
                </div>
            </div>
            <div class="loader" v-if="loading"></div>
        </div>
        <transition name="fade">
            <employee-menu :view_model="organization" :selected_items="selectedItems" :parent_object="parentObject" v-click-outside="collapseSelector" v-if="expandMenu"></employee-menu>
        </transition>


    </div>

</template>


<script>
    module.exports = {
        data: () => ({
            organization: [{
                "department_name": "PM",
                "department_code": "HQ-03",
                "selected_count": 0,
                "member": [{
                    "employee_id": "908",
                    "employee_name": "李安",
                    "employee_email": "annlee@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }, {
                    "employee_id": "927",
                    "employee_name": "劉穎潔",
                    "employee_email": "serena@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2117",
                    "employee_name": "姜政男",
                    "employee_email": "masao@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2001",
                    "employee_name": "季佐華",
                    "employee_email": "rayji@dynacw.co.jp",
                    "selected": false,
                    "isLeader": true
                }, {
                    "employee_id": "2118",
                    "employee_name": "鄭力維",
                    "employee_email": "stevencheng@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }, {
                    "employee_id": "2006",
                    "employee_name": "謝明憲",
                    "employee_email": "mshsieh@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }, {
                    "employee_id": "2049",
                    "employee_name": "章君豪",
                    "employee_email": "chunhao@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2032",
                    "employee_name": "李泓儒",
                    "employee_email": "scottlee@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }]
            }, {
                "department_name": "IA",
                "department_code": "HQ-51-01",
                "selected_count": 0,
                "member": [{
                    "employee_id": "2063",
                    "employee_name": "廖仁毅",
                    "employee_email": "jackyl@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2064",
                    "employee_name": "賴育樟",
                    "employee_email": "joelai@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2065",
                    "employee_name": "周秉叡",
                    "employee_email": "brchou@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "938",
                    "employee_name": "王富仁",
                    "employee_email": "alanwang@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }]
            }, {
                "department_name": "Gaiji",
                "department_code": "HQ-51-02",
                "selected_count": 0,
                "member": [{
                    "employee_id": "2055",
                    "employee_name": "陳俊宇",
                    "employee_email": "chunyu@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2058",
                    "employee_name": "張文軒",
                    "employee_email": "henry@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2059",
                    "employee_name": "薛茗方",
                    "employee_email": "mfhsueh@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "648",
                    "employee_name": "林俊男",
                    "employee_email": "jameslin@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }]
            }, {
                "department_name": "Retail",
                "department_code": "HQ-51-03",
                "selected_count": 0,
                "member": [{
                    "employee_id": "2056",
                    "employee_name": "陳明芬",
                    "employee_email": "elychen@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2060",
                    "employee_name": "吳國揚",
                    "employee_email": "kywu@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2061",
                    "employee_name": "吳怡靜",
                    "employee_email": "jillwu@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2062",
                    "employee_name": "曾慶君",
                    "employee_email": "carson@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "679",
                    "employee_name": "戴彧寧",
                    "employee_email": "taylor@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }]
            }, {
                "department_name": "NTD",
                "department_code": "HQ-51-04",
                "selected_count": 0,
                "member": [{
                    "employee_id": "2004",
                    "employee_name": "樂仲珉",
                    "employee_email": "kevinle@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2005",
                    "employee_name": "詹正良",
                    "employee_email": "liangChan@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }]
            }, {
                "department_name": "FD",
                "department_code": "HQ-52",
                "selected_count": 0,
                "member": [{
                    "employee_id": "2066",
                    "employee_name": "簡亨儒",
                    "employee_email": "franzchien@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }, {
                    "employee_id": "2067",
                    "employee_name": "謝德林",
                    "employee_email": "dlhsieh@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2068",
                    "employee_name": "葛幼寧",
                    "employee_email": "yuning@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2122",
                    "employee_name": "劉素禎",
                    "employee_email": "janeliu@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2069",
                    "employee_name": "賴麗華",
                    "employee_email": "kitty@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2070",
                    "employee_name": "楊慧賢",
                    "employee_email": "sandyy@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2071",
                    "employee_name": "許益慧",
                    "employee_email": "yihui@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }]
            }, {
                "department_name": "QA",
                "department_code": "HQ-53",
                "selected_count": 0,
                "member": [{
                    "employee_id": "2073",
                    "employee_name": "黃孟維",
                    "employee_email": "wayne@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2074",
                    "employee_name": "陳麗芳",
                    "employee_email": "angela@dynacw.co",
                    "selected": false,
                    "isLeader": false
                }, {
                    "employee_id": "2146",
                    "employee_name": "曹晉睿",
                    "employee_email": "raytsao@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }]
            }, {
                "department_name": "Support",
                "department_code": "HQ-54",
                "selected_count": 0,
                "member": [{
                    "employee_id": "2138",
                    "employee_name": "徐春玲",
                    "employee_email": "borenfu@dynacw.com",
                    "selected": false,
                    "isLeader": true
                }, {
                    "employee_id": "2139",
                    "employee_name": "林珮懿",
                    "employee_email": "peiyilin@dynacw.com",
                    "selected": false,
                    "isLeader": false
                }]
            }],

            selectedItems: [],

            parentObject: {
                searchKeyword: '',
            },

            expandMenu: false,

            loading: false,

        }),

        computed: {

        },

        watch: {

        },

        created() {
            //this.getOrganization()
        },

        methods: {
            expandSelector() {
                console.log("expand")
                if (this.loading) {
                    return
                }

                this.expandMenu = true
            },

            collapseSelector() {
                console.log("collapse")
                this.expandMenu = false
                this.parentObject.searchKeyword = ''
            },

            getOrganization() {
                axios.get('http://localhost:28516/Home/GetOrganization')
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },

        components: {
            'employee-menu': httpVueLoader('employee-menu.vue'),
        }
    }

</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .25s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .employee-selector-chips-container::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    .employee-selector-chips-container::-webkit-scrollbar-track {
        background: #5E6169;
    }

    .employee-selector-chips-container::-webkit-scrollbar-thumb {
        background: #888;
    }

    .employee-selector-chips-container::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .employee-selector-input input::placeholder {
        color: rgba(255, 255, 255, .75);
        ;
        opacity: 1;
    }

    .employee-selector-input input:-ms-input-placeholder {
        color: rgba(255, 255, 255, .75);
        ;
    }

    .employee-selector-input input::-ms-input-placeholder {
        color: rgba(255, 255, 255, .75);
        ;
    }

    .employee-selector-input {
        position: relative;
        width: 100%;
        padding: 8px 8px;
        border: 1px solid #5E6169;
        border-radius: 4px;
        background-color: #5E6169;
        cursor: pointer;
    }

    .employee-selector-input input {
        width: 100%;
        line-height: 20px;
        color: white;
        caret-color: #E97493;
        padding: 0 8px;

        flex: 1 1 auto;
        line-height: 20px;
        padding: 8px 0;
        max-width: 100%;
        min-width: 0;
        width: 100%;
        max-height: 32px;
        color: rgba(255, 255, 255, .87);
        border-radius: 0;
        border-radius: 0;
        background-color: transparent;
        border-style: none;
    }

    .employee-selector-input input::selection {
        background-color: #E97493;
        color: white;
    }

    .employee-selector-chips-container {
        width: 100%;
        overflow-x: auto;
    }

    .employee-selector-chips {
        width: max-content;
        overflow-y: hidden;
    }

    .employee-selector-chips .chip {
        background-color: #E97493;
        color: white;
        align-items: center;
        cursor: default;
        display: inline-flex;
        line-height: 20px;
        max-width: 100%;
        outline: none;
        overflow: hidden;
        padding: 0 12px;
        position: relative;
        text-decoration: none;
        transition-duration: .28s;
        transition-property: box-shadow, opacity;
        transition-timing-function: cubic-bezier(.4, 0, .2, 1);
        vertical-align: middle;
        white-space: nowrap;
        font-size: 14px;
        height: 32px;
        border-radius: 4px;
        margin: 4px 2px;
    }

    .employee-selector-chips .chip:hover {
        background-color: #F984A3;
    }

    .loader {
        position: absolute;
        top: 9px;
        right: 8px;
        border: 4px solid #6E7179;
        border-radius: 50%;
        border-top: 4px solid #F984A3;
        width: 24px;
        height: 24px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

</style>

<template>
    <v-content>
        <div class="employee-selector-input" @click="expandSelector()">
            <input type="text">
            <div class="employee-selector-chips">
                <v-chip label>Label</v-chip>
                <div class="chip">Keivn</div>
            </div>
        </div>

        <employee-menu :view_model="organization"></employee-menu>

        <v-text-field label="Regular"></v-text-field>
        <v-card>
            TEST
        </v-card>
    </v-content>

</template>


<script>
    module.exports = {
        data: () => ({
            items: [{
                    title: 'PM',
                    selected: false
                },
                {
                    title: 'FD',
                    selected: false
                },
                {
                    title: 'RD',
                    selected: true
                },
                {
                    title: 'QA',
                    selected: false
                },
            ],

            organization: [
                {
                    "department_name": "PM",
                    "department_code": "HQ-03",
                    "member": [{
                        "Id": "908",
                        "UserName": "李安",
                        "Position": "L",
                        "Email": "annlee@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "行銷部",
                        "Department": "HQ-03",
                        "DepartmentName": "行銷部",
                        "BranchCompany": "0"
                    }, {
                        "Id": "927",
                        "UserName": "劉穎潔",
                        "Position": "E",
                        "Email": "serena@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "行銷部",
                        "Department": "HQ-03",
                        "DepartmentName": "行銷部",
                        "BranchCompany": "0"
                    }, {
                        "Id": "1005",
                        "UserName": "陳濟銘",
                        "Position": "E",
                        "Email": "jimmychen@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-03",
                        "DepartmentName": "行銷部",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2117",
                        "UserName": "姜政男",
                        "Position": "E",
                        "Email": "masao@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": null,
                        "Department": "HQ-03-01",
                        "DepartmentName": "Retail-JP",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2001",
                        "UserName": "季佐華",
                        "Position": "L",
                        "Email": "rayji@dynacw.co.jp",
                        "Password": "PYEIeDz1iXvTJuPpSS5F3kZo5B5H61YQ4lclLiu6kfw=",
                        "Remark": "2001,2002,2003",
                        "Department": "HQ-03-01",
                        "DepartmentName": "Retail-JP",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2118",
                        "UserName": "鄭力維",
                        "Position": "L",
                        "Email": "stevencheng@dynacw.com",
                        "Password": "oKzDvLRAhpIyL2zKaabgeFv4LZtaTGDS7NSEv51q+5k=",
                        "Remark": null,
                        "Department": "HQ-03-02",
                        "DepartmentName": "Retail-TW",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2006",
                        "UserName": "謝明憲",
                        "Position": "L",
                        "Email": "mshsieh@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "2004,2005,2006,2007,2008,2009,2010",
                        "Department": "HQ-03-03",
                        "DepartmentName": "OEM",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2049",
                        "UserName": "章君豪",
                        "Position": "E",
                        "Email": "chunhao@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": null,
                        "Department": "HQ-03-03",
                        "DepartmentName": "OEM",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2032",
                        "UserName": "李泓儒",
                        "Position": "L",
                        "Email": "scottlee@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-03-04",
                        "DepartmentName": "Gaiji",
                        "BranchCompany": "0"
                    }]
                },
                {
                    "department_name": "RD",
                    "department_code": "HQ-51",
                    "member": [{
                        "Id": "2063",
                        "UserName": "廖仁毅",
                        "Position": "E",
                        "Email": "jackyl@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-01",
                        "DepartmentName": "RD-IA",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2064",
                        "UserName": "賴育樟",
                        "Position": "E",
                        "Email": "joelai@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-01",
                        "DepartmentName": "RD-IA",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2065",
                        "UserName": "周秉叡",
                        "Position": "E",
                        "Email": "brchou@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-01",
                        "DepartmentName": "RD-IA",
                        "BranchCompany": "0"
                    }, {
                        "Id": "938",
                        "UserName": "王富仁",
                        "Position": "L",
                        "Email": "alanwang@dynacw.com",
                        "Password": "364LHUCaxAdCOdXS6UYPSTGnU+FgSkAo6MmEF29nWn8=",
                        "Remark": "",
                        "Department": "HQ-51-01",
                        "DepartmentName": "RD-IA",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2055",
                        "UserName": "陳俊宇",
                        "Position": "E",
                        "Email": "chunyu@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-02",
                        "DepartmentName": "RD-Gaiji",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2058",
                        "UserName": "張文軒",
                        "Position": "E",
                        "Email": "henry@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-02",
                        "DepartmentName": "RD-Gaiji",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2059",
                        "UserName": "薛茗方",
                        "Position": "E",
                        "Email": "mfhsueh@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-02",
                        "DepartmentName": "RD-Gaiji",
                        "BranchCompany": "0"
                    }, {
                        "Id": "648",
                        "UserName": "林俊男",
                        "Position": "L",
                        "Email": "jameslin@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-02",
                        "DepartmentName": "RD-Gaiji",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2056",
                        "UserName": "陳明芬",
                        "Position": "E",
                        "Email": "elychen@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-03",
                        "DepartmentName": "RD-Retail",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2060",
                        "UserName": "吳國揚",
                        "Position": "E",
                        "Email": "kywu@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-03",
                        "DepartmentName": "RD-Retail",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2061",
                        "UserName": "吳怡靜",
                        "Position": "E",
                        "Email": "jillwu@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-03",
                        "DepartmentName": "RD-Retail",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2062",
                        "UserName": "曾慶君",
                        "Position": "E",
                        "Email": "carson@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-03",
                        "DepartmentName": "RD-Retail",
                        "BranchCompany": "0"
                    }, {
                        "Id": "679",
                        "UserName": "戴彧寧",
                        "Position": "L",
                        "Email": "taylor@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-03",
                        "DepartmentName": "RD-Retail",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2132",
                        "UserName": "徐佳羚",
                        "Position": "E",
                        "Email": "ponyhsu@dynacw.com",
                        "Password": "a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=",
                        "Remark": null,
                        "Department": "HQ-51-04",
                        "DepartmentName": "RD-NTD",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2002",
                        "UserName": "傅柏荏",
                        "Position": "E",
                        "Email": "borenfu@dynacw.com",
                        "Password": "adHniYeglZ6kueyWuoOSnqUDqkaWCyjoQGl1icRd65U=",
                        "Remark": "",
                        "Department": "HQ-51-04",
                        "DepartmentName": "RD-NTD",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2003",
                        "UserName": "翁孟廷",
                        "Position": "E",
                        "Email": "martinweng@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-04",
                        "DepartmentName": "RD-NTD",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2004",
                        "UserName": "樂仲珉",
                        "Position": "E",
                        "Email": "kevinle@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-51-04",
                        "DepartmentName": "RD-NTD",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2005",
                        "UserName": "詹正良",
                        "Position": "L",
                        "Email": "liangChan@dynacw.com",
                        "Password": "VdJiLVOMvIFkK/t60pZgxmaWW93L+vZG5YOYBiW1xZg=",
                        "Remark": "",
                        "Department": "HQ-51-04",
                        "DepartmentName": "RD-NTD",
                        "BranchCompany": "0"
                    }]
                },
                {
                    "department_name": "FD",
                    "department_code": "HQ-52",
                    "member": [{
                        "Id": "2066",
                        "UserName": "簡亨儒",
                        "Position": "L",
                        "Email": "franzchien@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-52",
                        "DepartmentName": "FD",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2067",
                        "UserName": "謝德林",
                        "Position": "E",
                        "Email": "dlhsieh@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-52-01",
                        "DepartmentName": "工具/字型交換",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2068",
                        "UserName": "葛幼寧",
                        "Position": "E",
                        "Email": "yuning@dynacw.com",
                        "Password": "a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=",
                        "Remark": "",
                        "Department": "HQ-52-02-01",
                        "DepartmentName": "字型設計中心一",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2122",
                        "UserName": "劉素禎",
                        "Position": "E",
                        "Email": "janeliu@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": null,
                        "Department": "HQ-52-02-01",
                        "DepartmentName": "字型設計中心一",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2069",
                        "UserName": "賴麗華",
                        "Position": "E",
                        "Email": "kitty@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-52-02-02",
                        "DepartmentName": "字型設計中心二",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2070",
                        "UserName": "楊慧賢",
                        "Position": "E",
                        "Email": "sandyy@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-52-02-03",
                        "DepartmentName": "字型設計中心三",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2071",
                        "UserName": "許益慧",
                        "Position": "E",
                        "Email": "yihui@dynacw.com",
                        "Password": "FeKw08M4keuw8e9gnsQZQgwg4yDOlMZfvIwzEkSOsiU=",
                        "Remark": "",
                        "Department": "HQ-52-02-04",
                        "DepartmentName": "Bitmap",
                        "BranchCompany": "0"
                    }]
                },
                {
                    "department_name": "QA",
                    "department_code": "HQ-53",
                    "member": [{
                        "Id": "2072",
                        "UserName": "楊育芳",
                        "Position": "E",
                        "Email": "tomyang@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-53",
                        "DepartmentName": "QA",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2073",
                        "UserName": "黃孟維",
                        "Position": "E",
                        "Email": "wayne@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-53",
                        "DepartmentName": "QA",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2074",
                        "UserName": "陳麗芳",
                        "Position": "E",
                        "Email": "angela@dynacw.co",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": "",
                        "Department": "HQ-53",
                        "DepartmentName": "QA",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2146",
                        "UserName": "曹晉睿",
                        "Position": "L",
                        "Email": "raytsao@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": null,
                        "Department": "HQ-53",
                        "DepartmentName": "QA",
                        "BranchCompany": "0"
                    }]
                },
                {
                    "department_name": "Support",
                    "department_code": "HQ-54",
                    "member": [{
                        "Id": "2138",
                        "UserName": "徐春玲",
                        "Position": "L",
                        "Email": "borenfu@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": null,
                        "Department": "HQ-54",
                        "DepartmentName": "Support",
                        "BranchCompany": "0"
                    }, {
                        "Id": "2139",
                        "UserName": "林珮懿",
                        "Position": "E",
                        "Email": "peiyilin@dynacw.com",
                        "Password": "73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=",
                        "Remark": null,
                        "Department": "HQ-54",
                        "DepartmentName": "Support",
                        "BranchCompany": "0"
                    }]
                }
            ],

            currentItems: []
        }),

        computed: {

        },

        watch: {

        },

        created() {

        },

        methods: {
            expandSelector() {
                console.log("expand")
            },

            clickItem() {
                console.log("clickItem")

            },

            clickAction() {
                console.log("clickAction")
                event.stopPropagation();
            }
        },

        components: {
            'employee-menu': httpVueLoader('employee-menu.vue'),
        }
    }

</script>

<style>
    .employee-selector-input {
        width: 100%;
        padding: 4px 2px;
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
        color: rgba(0, 0, 0, .87);
    }

    .employee-selector-input input::selection {
        background-color: #E97493;
        color: white;
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
    }

    .employee-selector-chips .chip:hover {
        background-color: #F984A3;
    }

</style>

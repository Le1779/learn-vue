<template>
    <div>
        <a href="/Task/ExportExcel" class="export-excel-button" @click="exportExcel"></a>
        <div v-for="button in buttons" class="filter-button" :class="[filter.current==button.value ? '' : 'hidden']" @click="filter.current=button.value">
            {{button.name}}
            <div class="material-icons">{{filter.current==button.value ? 'visibility' : 'visibility_off'}}</div>
        </div>
    </div>
</template>


<script scoped>
    module.exports = {
        props: ["filter", "export_excel_url"],
        data: () => ({
            buttons: [{
                name: '與我有關的工單',
                value: 'Related'
            }, {
                name: '檢視全部工單',
                value: 'All'
            }, {
                name: '部門進行中工單',
                value: 'Department'
            }, {
                name: '保密工單',
                value: 'Confidential'
            }]
        }),

        computed: {

        },

        watch: {

        },

        created() {},

        methods: {
            exportExcel() {
                event.preventDefault()
                var type = 'my'
                switch (this.filter.current) {
                    case 'All':
                        type = 'all'
                        break;
                    case 'Department':
                        type = 'department'
                        break;
                    case 'Confidential':
                        type = 'secret'
                        break;
                    case 'Related':
                    default:
                        type = 'my'
                        break;
                }
                var url = this.export_excel_url + "/" + type
                window.location.href = url
            }
        },

        components: {

        }
    }

</script>

<style scoped>
    .filter-button {
        display: inline-grid;
        grid-template-columns: auto 24px;
        background-color: #E4E4E4;
        padding: 8px 12px;
        border-radius: 5px;
        margin-left: 30px;
        transition: 0.15s opacity 0.15s ease-in-out;
    }

    .filter-button.hidden {
        opacity: 0.3;
    }

    .filter-button .material-icons {
        padding-left: 2px;
        color: #E63061;
    }

    .filter-button.hidden .material-icons {
        color: black;
    }

    .export-excel-button {
        position: relative;
        height: 36px;
        width: 40px;
        float: left;
        border: none;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        background: #fff;
        box-shadow: 0 0 15px 0 #ccc;
        transition: all .2s;
        color: transparent;
        margin-left: 0.5vw;
        margin-bottom: 0.5vw;
    }

    .export-excel-button:hover {
        box-shadow: 0 0 5px 0 #333;
    }

    .export-excel-button::before {
        content: '';
        position: absolute;
        display: block;
        height: 20px;
        width: 20px;
        left: 10px;
        background-image: url(data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20id%3D%22Capa_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20width%3D%2220px%22%20height%3D%2220px%22%20viewBox%3D%220%200%20548.291%20548.291%22%20style%3D%22enable-background%3Anew%200%200%20548.291%20548.291%3B%22%0A%09%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cg%3E%0A%09%3Cpath%20d%3D%22M486.206%2C196.121H473.04v-63.525c0-0.396-0.062-0.795-0.109-1.2c-0.021-2.52-0.829-4.997-2.556-6.96L364.657%2C3.677%0A%09%09c-0.033-0.031-0.064-0.042-0.085-0.075c-0.63-0.704-1.364-1.29-2.143-1.796c-0.229-0.154-0.461-0.283-0.702-0.419%0A%09%09c-0.672-0.365-1.387-0.672-2.121-0.893c-0.2-0.052-0.379-0.134-0.577-0.186C358.23%2C0.118%2C357.401%2C0%2C356.562%2C0H96.757%0A%09%09C84.894%2C0%2C75.256%2C9.649%2C75.256%2C21.502v174.613H62.092c-16.971%2C0-30.732%2C13.756-30.732%2C30.733v159.812%0A%09%09c0%2C16.961%2C13.761%2C30.731%2C30.732%2C30.731h13.164V526.79c0%2C11.854%2C9.638%2C21.501%2C21.501%2C21.501h354.776%0A%09%09c11.853%2C0%2C21.501-9.647%2C21.501-21.501V417.392h13.166c16.966%2C0%2C30.729-13.764%2C30.729-30.731V226.854%0A%09%09C516.93%2C209.872%2C503.176%2C196.121%2C486.206%2C196.121z%20M96.757%2C21.502h249.054v110.006c0%2C5.94%2C4.817%2C10.751%2C10.751%2C10.751h94.972%0A%09%09v53.861H96.757V21.502z%20M314.576%2C314.661c-21.124-7.359-34.908-19.045-34.908-37.544c0-21.698%2C18.11-38.297%2C48.116-38.297%0A%09%09c14.331%2C0%2C24.903%2C3.014%2C32.442%2C6.413l-6.411%2C23.2c-5.091-2.446-14.146-6.037-26.598-6.037s-18.488%2C5.662-18.488%2C12.266%0A%09%09c0%2C8.115%2C7.171%2C11.696%2C23.58%2C17.921c22.446%2C8.305%2C33.013%2C20%2C33.013%2C37.921c0%2C21.323-16.415%2C39.435-51.318%2C39.435%0A%09%09c-14.524%2C0-28.861-3.769-36.031-7.737l5.843-23.77c7.738%2C3.958%2C19.627%2C7.927%2C31.885%2C7.927c13.218%2C0%2C20.188-5.47%2C20.188-13.774%0A%09%09C335.894%2C324.667%2C329.858%2C320.13%2C314.576%2C314.661z%20M265.917%2C343.9v24.157h-79.439V240.882h28.877V343.9H265.917z%20M94.237%2C368.057%0A%09%09H61.411l36.788-64.353l-35.473-62.827h33.021l11.125%2C23.21c3.774%2C7.736%2C6.606%2C13.954%2C9.628%2C21.135h0.367%0A%09%09c3.027-8.115%2C5.477-13.775%2C8.675-21.135l10.756-23.21h32.827l-35.848%2C62.066l37.74%2C65.103h-33.202l-11.515-23.022%0A%09%09c-4.709-8.855-7.73-15.465-11.316-22.824h-0.375c-2.645%2C7.359-5.845%2C13.969-9.811%2C22.824L94.237%2C368.057z%20M451.534%2C520.968H96.757%0A%09%09V417.392h354.776V520.968z%20M451.728%2C368.057l-11.512-23.022c-4.715-8.863-7.733-15.465-11.319-22.825h-0.366%0A%09%09c-2.646%2C7.36-5.858%2C13.962-9.827%2C22.825l-10.551%2C23.022h-32.836l36.788-64.353l-35.471-62.827h33.02l11.139%2C23.21%0A%09%09c3.77%2C7.736%2C6.593%2C13.954%2C9.618%2C21.135h0.377c3.013-8.115%2C5.459-13.775%2C8.671-21.135l10.752-23.21h32.835l-35.849%2C62.066%0A%09%09l37.733%2C65.103h-33.202V368.057z%22%2F%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A);
        transition: all .5s;
    }

    .export-excel-button:hover::before {
        background-image: url(data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20id%3D%22Capa_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%20471.2%20471.2%22%20style%3D%22enable-background%3Anew%200%200%20471.2%20471.2%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cg%3E%0A%09%3Cg%3E%0A%09%09%3Cpath%20d%3D%22M457.7%2C230.15c-7.5%2C0-13.5%2C6-13.5%2C13.5v122.8c0%2C33.4-27.2%2C60.5-60.5%2C60.5H87.5c-33.4%2C0-60.5-27.2-60.5-60.5v-124.8%0A%09%09%09c0-7.5-6-13.5-13.5-13.5s-13.5%2C6-13.5%2C13.5v124.8c0%2C48.3%2C39.3%2C87.5%2C87.5%2C87.5h296.2c48.3%2C0%2C87.5-39.3%2C87.5-87.5v-122.8%0A%09%09%09C471.2%2C236.25%2C465.2%2C230.15%2C457.7%2C230.15z%22%2F%3E%0A%09%09%3Cpath%20d%3D%22M226.1%2C346.75c2.6%2C2.6%2C6.1%2C4%2C9.5%2C4s6.9-1.3%2C9.5-4l85.8-85.8c5.3-5.3%2C5.3-13.8%2C0-19.1c-5.3-5.3-13.8-5.3-19.1%2C0l-62.7%2C62.8%0A%09%09%09V30.75c0-7.5-6-13.5-13.5-13.5s-13.5%2C6-13.5%2C13.5v273.9l-62.8-62.8c-5.3-5.3-13.8-5.3-19.1%2C0c-5.3%2C5.3-5.3%2C13.8%2C0%2C19.1%0A%09%09%09L226.1%2C346.75z%22%2F%3E%0A%09%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A);
    }

</style>

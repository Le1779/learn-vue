<template>
    <div>
        <div v-if="platform == 'facebook'" class="platform-icon">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112.196 112.196" style="enable-background:new 0 0 112.196 112.196;" xml:space="preserve">
                <circle style="fill:#3B5998;" cx="56.098" cy="56.098" r="56.098" />
                <path style="fill:#FFFFFF;" d="M70.201,58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34
		c0-5.964,2.833-15.303,15.301-15.303L71.56,21.81v12.51h-8.151c-1.337,0-3.217,0.668-3.217,3.513v7.585h11.334L70.201,58.294z" />
            </svg>
        </div>

        <div v-if="platform == 'apple'" class="platform-icon">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 475.088 475.088" style="enable-background:new 0 0 475.088 475.088;" xml:space="preserve">
                <path d="M391.29,310.91c-13.135-18.842-19.698-40.07-19.698-63.666c0-21.508,6.194-41.213,18.556-59.102
			c6.662-9.707,17.514-20.934,32.551-33.689c-9.896-12.178-19.793-21.695-29.697-28.549c-17.891-12.37-38.164-18.555-60.812-18.555
			c-13.511,0-29.979,3.234-49.389,9.71c-18.654,6.471-32.265,9.71-40.826,9.71c-6.475,0-19.606-2.853-39.401-8.566
			c-19.985-5.711-36.831-8.564-50.535-8.564c-32.738,0-59.766,13.706-81.083,41.112c-21.508,27.79-32.264,63.382-32.264,106.78
			c0,46.062,13.993,93.928,41.971,143.607c28.358,49.297,57.005,73.949,85.936,73.949c9.707,0,22.27-3.237,37.685-9.708
			c15.42-6.276,28.933-9.421,40.545-9.421c12.368,0,26.741,3.045,43.109,9.133c17.319,6.085,30.646,9.131,39.971,9.131
			c24.362,0,48.824-18.654,73.374-55.959c15.985-23.791,27.692-47.582,35.115-71.376C419.458,341.744,404.424,329.753,391.29,310.91
			z" />
                <path d="M294.213,90.219c11.994-11.991,20.844-25.126,26.556-39.399c5.517-14.275,8.271-27.22,8.271-38.832
			c0-0.759-0.041-1.712-0.144-2.855c-0.086-1.142-0.137-2.091-0.137-2.853c-0.192-0.572-0.428-1.619-0.712-3.14
			c-0.284-1.521-0.521-2.568-0.716-3.14c-33.499,7.808-57.29,21.892-71.376,42.259c-14.271,20.557-21.698,45.013-22.27,73.373
			c12.753-1.143,22.646-2.758,29.692-4.853C273.663,107.352,283.929,100.497,294.213,90.219z" />
            </svg>
        </div>

        <div v-if="platform == 'google'" class="platform-icon">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <path style="fill:#FBBB00;" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
	C103.821,274.792,107.225,292.797,113.47,309.408z" />
                <path style="fill:#518EF8;" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" />
                <path style="fill:#28B446;" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" />
                <path style="fill:#F14336;" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
	C318.115,0,375.068,22.126,419.404,58.936z" />
            </svg>
        </div>

        <div v-if="platform == 'dynacw'" class="platform-icon">
            <svg viewBox="0 0 480 600">
                <rect x="10" y="10" rx="10" ry="10" width="140" height="60" style="fill:black; opacity:0.65" />
                <rect x="170" y="10" rx="10" ry="10" width="140" height="60" style="fill:black; opacity:0.83" />
                <rect x="330" y="10" rx="10" ry="10" width="140" height="60" style="fill:black; opacity:0.45" />
                <rect x="10" y="90" rx="10" ry="10" width="140" height="60" style="fill:black; opacity:0.83" />
                <rect x="170" y="90" rx="10" ry="10" width="140" height="60" style="fill:black; opacity:0.83" />
                <rect x="330" y="90" rx="10" ry="10" width="140" height="60" style="fill:black; opacity:0.83" />
                <rect x="10" y="170" rx="10" ry="10" width="100" height="60" style="fill:black; opacity:0.83" />
                <rect x="130" y="170" rx="10" ry="10" width="100" height="60" style="fill:#E63061; opacity:1" />
                <rect x="250" y="170" rx="10" ry="10" width="100" height="60" style="fill:black; opacity:0.65" />
                <rect x="370" y="170" rx="10" ry="10" width="100" height="60" style="fill:black; opacity:0.83" />
                <rect x="10" y="250" rx="10" ry="10" width="100" height="60" style="fill:black; opacity:0.5" />
                <rect x="130" y="250" rx="10" ry="10" width="100" height="60" style="fill:black; opacity:0.83" />
                <rect x="250" y="250" rx="10" ry="10" width="100" height="60" style="fill:black; opacity:0.83" />
                <rect x="370" y="250" rx="10" ry="10" width="100" height="60" style="fill:black; opacity:0.83" />
                <rect x="10" y="330" rx="10" ry="10" width="220" height="60" style="fill:black; opacity:0.65" />
                <rect x="250" y="330" rx="10" ry="10" width="220" height="60" style="fill:black; opacity:0.83" />
                <rect x="10" y="410" rx="10" ry="10" width="220" height="60" style="fill:black; opacity:0.83" />
                <rect x="250" y="410" rx="10" ry="10" width="220" height="60" style="fill:black; opacity:0.65" />
            </svg>
        </div>
    </div>
</template>

<script>

    module.exports = {
        props: ["platform"]
    }
</script>

<style scoped>

</style>
// Products slider menggunakan framework glide.js
document.addEventListener("DOMContentLoaded", function () {
    // Fetch data dari products.json
    fetch("products.json") 
        .then((response) => response.json())
        .then((data) => {
            
            createProductSlides(data);

            
            const glide = new Glide(".glide", {
                type: "carousel",
                startAt: 0,
                perView: 1,
                autoplay: 2500, // Interval products slider
            });

            glide.mount();
        })
        .catch((error) => console.error("Error fetching data:", error));
});

function createProductSlides(products) {
    const sliderContainer = document.getElementById("slider-container");

    products.forEach((product) => {
        const slide = document.createElement("li");
        slide.classList.add("glide__slide");

        // bagian image pada products slider
        const image = document.createElement("img");
        image.classList.add("product-image");
        image.src = `${product.image}`;
        image.alt = `${product.name} Image`;

        // bagian details pada products slider
        const details = document.createElement("div");
        details.classList.add("product-details");
        details.innerHTML = `
          <h3>${product.name}</h3>
          <p>Series: ${product.series}</p>
          <p>Core (Threads): ${product["core(threads)"]}</p>
          <p>Base: ${product.base} GHz</p>
          <p>Boost: ${product.boost} GHz</p>
          <p>L3 Cache: ${product.l3} MB</p>
          <p>TDP: ${product.tdp} W</p>
          <p>Release Date: ${product["release-date"]}</p>
          <p>MSRP: Rp ${product.msrp}</p>
        `;

        // Penggabungan bagian image dan details pada products slider
        slide.appendChild(image);
        slide.appendChild(details);

        sliderContainer.appendChild(slide);
    });
}

// Cpu Selector
// Inisialisasi DOM dari rakit.html
const categoryDropdown = document.getElementById("category");
const cpuDropdown = document.getElementById("cpu");
const resultContainer = document.getElementById("result");

// Load json
async function loadJSON(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Mengambil cpu category untuk dropdown
loadJSON("./products.json").then((products) => {
    const categories = Array.from(
        new Set(products.map((product) => product.category))
    );
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.text = category;
        categoryDropdown.add(option);
    });

    // Update daftar cpu models 
    updateCpuList();
});

// Mengambil cpu models untuk dropdown dari category yang dipilih
function updateCpuList() {
    const selectedCategory = categoryDropdown.value;
    loadJSON("./products.json").then((products) => {
        const filteredCpus = products.filter(
            (product) => product.category === selectedCategory
        );

        
        cpuDropdown.innerHTML = "";

        // Populate CPU models dropdown
        filteredCpus.forEach((cpu) => {
            const option = document.createElement("option");
            option.text = `${cpu.name} ${cpu.series}`;
            cpuDropdown.add(option);
        });
    });
}

// Pencarian hardware yang berhubungan sesuai data json
function findMatchingHardware() {
    const selectedCpuModel = cpuDropdown.value;
    loadJSON("./products.json").then((products) => {
        const selectedCpu = products.find(
            (cpu) => `${cpu.name} ${cpu.series}` === selectedCpuModel
        );

        // menyiapkan data builds.json
        loadJSON("./builds.json").then((builds) => {
            const matchedHardware = builds.find(
                (build) => build.category === selectedCpu.category
            );

            // Menghitung total harga
            const totalPrice = parseFloat(selectedCpu.msrp) + parseFloat(matchedHardware.price);

            // mengubah angka biasa menjadi IDR
            const formattedTotalPrice = totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

            // Hasil yang di tampilkan di html
            resultContainer.innerHTML = `
            <style>
            p {
                display: block;
                justify-content: flex-end;
            }
            
            </style>
                <div id="result-content">

                    <div class="hasil">
                        <div class="hasil-image">
                            <img src="${selectedCpu.image}" alt="${selectedCpu.name} ${selectedCpu.series} Image" width="200">
                        </div>
                        <div class="hasil-details">
                            <h3>CPU: ${selectedCpu.name} ${selectedCpu.series}</h3>
                        </div>
                    </div>

                    <div class="hasil">
                        <div class="hasil-image">
                            <img src="${matchedHardware["cooler-image"]}" alt="${matchedHardware.cooler} Image" width="200">
                        </div>
                        <div class="hasil-details">
                            <h3>Cooler: ${matchedHardware.cooler}</h3>
                        </div>
                    </div>

                    <div class="hasil">
                        <div class="hasil-image">
                            <img src="${matchedHardware["motherboard-image"]}" alt="${matchedHardware.motherboard} Image" width="200">
                        </div>
                        <div class="hasil-details">
                            <h3>Motherboard: ${matchedHardware.motherboard}</h3>
                        </div>
                    </div>


                    <div class="hasil">
                        <div class="hasil-image">
                            <img src="${matchedHardware["ram-image"]}" alt="${matchedHardware.ram} Image" width="200">
                        </div>
                        <div class="hasil-details">
                            <h3>RAM: ${matchedHardware.ram}</h3>
                        </div>
                    </div>


                    <div class="hasil">
                        <div class="hasil-image">
                            <img src="${matchedHardware["gpu-image"]}" alt="${matchedHardware.gpu} Image" width="200">
                        </div>
                        <div class="hasil-details">
                            <h3>GPU: ${matchedHardware.gpu}</h3>
                        </div>
                    </div>

                    <div class="hasil">
                        <div class="hasil-image">
                            <img src="${matchedHardware["ssd-image"]}" alt="${matchedHardware.ssd} Image" width="200">
                        </div>
                        <div class="hasil-details">
                            <h3>SSD: ${matchedHardware.ssd}</h3>
                        </div>
                    </div>


                    <div class="hasil">
                        <div class="hasil-image">
                            <img src="${matchedHardware["psu-image"]}" alt="${matchedHardware.psu} Image" width="200">
                        </div>
                        <div class="hasil-details">
                            <h3>PSU: ${matchedHardware.psu}</h3>
                        </div>
                    </div>


                    <div class="hasil">
                        <div class="hasil-image">
                            <img src="${matchedHardware["case-image"]}" alt="${matchedHardware.case} Image" width="200">
                        </div>
                        <div class="hasil-details">
                            <h3>Case: ${matchedHardware.case}</h3>
                        </div>
                    </div>

                    <div class="hasil-total-harga">
                        <div class="hasil-image">
                            <img src="${matchedHardware["price-image"]}" alt="${matchedHardware.price} Image" width="200">
                        </div>
                        <div class="hasil-details">
                            <h1><b>Estimated PC price:  ${formattedTotalPrice}</b></h1>
                        </div>
                    </div>

                </div>
            `;
        });
    });
}

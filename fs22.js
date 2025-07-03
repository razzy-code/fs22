// DOM Elements
const tabButtons = document.querySelectorAll('.fs22-tabs li');
const contentSections = document.querySelectorAll('.content-section');
const currentDateElement = document.getElementById('current-date');
const gameTimeElement = document.getElementById('game-time');

// Data
let cropsData = [];
let pricesData = [];
let tasksData = [];
let notesData = [];
let sellPoints = [];
let products = [];

// Chart instance
let priceChart = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load data from localStorage or initialize with sample data
    loadData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize UI
    updateCurrentDate();
    updateGameTime();
    
    // Show the current tab
    showTab('crop-calendar');
    
    // Initialize all sections
    initCropCalendar();
    initPriceTracker();
    initTaskManager();
    initNotes();
    
    // Show toast notification if first visit
    if (!localStorage.getItem('fs22companion_visited')) {
        showToast('FS22 Asistanına hoş geldiniz! Çiftlik aktivitelerinizi takip etmeye başlayın.');
        localStorage.setItem('fs22companion_visited', 'true');
    }
});

// Load data from localStorage or initialize with sample data
function loadData() {
    // Try to load from localStorage
    if (localStorage.getItem('fs22companion_crops')) {
        cropsData = JSON.parse(localStorage.getItem('fs22companion_crops'));
    } else {
        cropsData = [
    {
        id: 1,
        name: "Buğday",
        sowingMonths: [9, 10],
        harvestMonths: [7, 8],
        growthTime: "10 ay",
        yield: "8000-10000",
        bestSoil: "Orta",
        priceRange: "€800-€1200/1000L",
        equipment: "Ekim makinesi, Biçerdöver, Römork",
        notes: "Un üretiminde kullanılabilir veya doğrudan satılabilir."
    },
    {
        id: 2,
        name: "Arpa",
        sowingMonths: [9, 10],
        harvestMonths: [7, 8],
        growthTime: "10 ay",
        yield: "7000-9000",
        bestSoil: "Orta",
        priceRange: "€700-€1100/1000L",
        equipment: "Ekim makinesi, Biçerdöver, Römork",
        notes: "Hayvan yemi veya malt üretimi için kullanılır."
    },
    {
        id: 3,
        name: "Kanola",
        sowingMonths: [8, 9],
        harvestMonths: [6, 7],
        growthTime: "10 ay",
        yield: "4000-6000",
        bestSoil: "Orta-Ağır",
        priceRange: "€1000-€1500/1000L",
        equipment: "Ekim makinesi, Biçerdöver, Römork",
        notes: "Yüksek değerli mahsul ancak düşük verim."
    },
    {
        id: 4,
        name: "Mısır",
        sowingMonths: [4, 5],
        harvestMonths: [9, 10],
        growthTime: "5-6 ay",
        yield: "15000-20000",
        bestSoil: "Orta",
        priceRange: "€600-€900/1000L",
        equipment: "Mısır ekim makinesi, Yem biçerdöveri, Römork",
        notes: "Yüksek verim ancak özel ekipman gerektirir."
    },
    {
        id: 5,
        name: "Şeker Pancarı",
        sowingMonths: [3, 4],
        harvestMonths: [9, 10],
        growthTime: "6 ay",
        yield: "60000-80000",
        bestSoil: "Orta-Ağır",
        priceRange: "€400-€700/1000L",
        equipment: "Pancar ekim makinesi, Pancar hasat makinesi, Römork",
        notes: "Çok yüksek verim ancak özel ekipman gerektirir."
    },
    {
        id: 6,
        name: "Patates",
        sowingMonths: [3, 4],
        harvestMonths: [8, 9],
        growthTime: "5 ay",
        yield: "40000-50000",
        bestSoil: "Hafif-Orta",
        priceRange: "€500-€800/1000L",
        equipment: "Patates ekim makinesi, Patates hasat makinesi, Römork",
        notes: "Yüksek verim ancak özel ekipman gerektirir."
    },
    {
        id: 7,
        name: "Soya Fasulyesi",
        sowingMonths: [4, 5],
        harvestMonths: [9, 10],
        growthTime: "5 ay",
        yield: "6000-8000",
        bestSoil: "Orta",
        priceRange: "€900-€1300/1000L",
        equipment: "Ekim makinesi, Biçerdöver, Römork",
        notes: "Kanola'ya iyi bir alternatif ve daha yüksek verim."
    },
    {
        id: 8,
        name: "Ayçiçeği",
        sowingMonths: [3, 4],
        harvestMonths: [9, 10],
        growthTime: "6 ay",
        yield: "4000-6000",
        bestSoil: "Hafif-Orta",
        priceRange: "€800-€1200/1000L",
        equipment: "Ekim makinesi, Başlıklı biçerdöver, Römork",
        notes: "Hasat için özel başlık gerektirir."
    },
    {
        id: 9,
        name: "Yulaf",
        sowingMonths: [3, 4],
        harvestMonths: [7, 8],
        growthTime: "4-5 ay",
        yield: "7000-9000",
        bestSoil: "Orta",
        priceRange: "€600-€900/1000L",
        equipment: "Ekim makinesi, Biçerdöver, Römork",
        notes: "Hayvan yemi veya yulaf ezmesi üretimi için kullanılır."
    },
    {
        id: 10,
        name: "Şeker Kamışı",
        sowingMonths: [4, 5],
        harvestMonths: [10, 11],
        growthTime: "6 ay",
        yield: "50000-70000",
        bestSoil: "Ağır",
        priceRange: "€300-€500/1000L",
        equipment: "Şeker kamışı ekim makinesi, Özel hasat makinesi, Römork",
        notes: "Çok yüksek verim ancak özel ekipman gerektirir."
    },
    {
        id: 11,
        name: "Pamuk",
        sowingMonths: [4, 5],
        harvestMonths: [10, 11],
        growthTime: "6 ay",
        yield: "2000-3000",
        bestSoil: "Hafif-Orta",
        priceRange: "€1500-€2000/1000L",
        equipment: "Pamuk ekim makinesi, Pamuk hasat makinesi, Römork",
        notes: "Yüksek değerli mahsul ancak düşük verim."
    },
    {
        id: 12,
        name: "Süpürge Darısı",
        sowingMonths: [5, 6],
        harvestMonths: [9, 10],
        growthTime: "4 ay",
        yield: "5000-7000",
        bestSoil: "Hafif",
        priceRange: "€400-€600/1000L",
        equipment: "Ekim makinesi, Biçerdöver, Römork",
        notes: "Kurak iklimlerde iyi performans gösterir."
    },
    {
        id: 13,
        name: "Üzüm",
        sowingMonths: [3, 4],
        harvestMonths: [8, 9],
        growthTime: "5 ay",
        yield: "3000-5000",
        bestSoil: "Hafif-Orta",
        priceRange: "€2000-€3000/1000L",
        equipment: "Özel bağ dikim makinesi, Üzüm hasat makinesi, Römork",
        notes: "Çok yüksek değerli ancak özel ekipman gerektirir."
    },
    {
        id: 14,
        name: "Zeytin",
        sowingMonths: [3, 4],
        harvestMonths: [10, 11],
        growthTime: "7 ay",
        yield: "2000-4000",
        bestSoil: "Hafif",
        priceRange: "€2500-€3500/1000L",
        equipment: "Zeytin ağacı dikim makinesi, Zeytin hasat makinesi, Römork",
        notes: "Uzun vadeli yatırım gerektirir."
    },
    {
        id: 15,
        name: "Kavak",
        sowingMonths: [3, 4],
        harvestMonths: [60], // 5 yıl sonra
        growthTime: "5 yıl",
        yield: "10000-15000",
        bestSoil: "Orta-Ağır",
        priceRange: "€800-€1200/1000L",
        equipment: "Ağaç dikim makinesi, Ağaç kesme makinesi, Römork",
        notes: "Uzun vadeli yatırım, büyük alan gerektirir."
    },
    {
        id: 16,
        name: "Çim",
        sowingMonths: [3, 4, 5, 8, 9],
        harvestMonths: [5, 6, 7, 9, 10],
        growthTime: "2-3 ay",
        yield: "10000-15000",
        bestSoil: "Hafif-Ağır",
        priceRange: "€200-€400/1000L",
        equipment: "Çim ekim makinesi, Biçme makinesi, Balya makinesi",
        notes: "Sık hasat edilebilir, hayvan yemi için ideal."
    }
];
        saveTasksData();
    }

    if (localStorage.getItem('fs22companion_notes')) {
        notesData = JSON.parse(localStorage.getItem('fs22companion_notes'));
    } else {
        // Sample note data
        notesData = [
    {
        id: 1,
        title: "Tarla Rotasyon Planı",
        content: "Yıl 1: Buğday\nYıl 2: Kanola\nYıl 3: Arpa\nYıl 4: Nadas (çim ile)",
        category: "fields",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Ekipman Bakımı",
        content: "Traktör #1 yağ değişimi gerekiyor\nBiçerdöver yeni bıçak istiyor\nRömork lastik değişimi gerekiyor",
        category: "equipment",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 3,
        title: "Yaklaşan Masraflar",
        content: "Yeni ekim makinesi: €80.000\nGübre: €15.000\nİşçi ücretleri: aylık €5.000",
        category: "finance",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 4,
        title: "Hayvan Bakım Takvimi",
        content: "Sığırlar: Günde 2 kez yemleme\nKoyunlar: Haftalık tımar\nTavuklar: Günlük yumurta toplama",
        category: "animals",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 5,
        title: "En Karlı Mahsuller",
        content: "1. Üzüm (€2000-3000/1000L)\n2. Zeytin (€2500-3500/1000L)\n3. Pamuk (€1500-2000/1000L)",
        category: "general",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 6,
        title: "Depolama Kapasiteleri",
        content: "Silaj: 500.000L\nBuğday: 200.000L\nMısır: 300.000L\nPamuk: 100.000L",
        category: "fields",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
        saveNotesData();
    }

    // Sell points and products (these don't need to be saved)
    sellPoints = [
    "Tahıl Değirmeni", 
    "Yağ Fabrikası", 
    "Mandıra", 
    "İplikhane",
    "Fırın", 
    "Şeker Fabrikası", 
    "Biyogaz Tesisi", 
    "Hayvan Satıcısı",
    "BGA", 
    "Bıçkıhane (1)", 
    "Bıçkıhane (2)", 
    "Tekstil Fabrikası",
    "Restoran", 
    "Mısır Gevreği Fabrikası", 
    "Üzüm İşleme Tesisi",
    "Süpermarket", 
    "Terzi Dükkanı", 
    "Marangozluk", 
    "North Değirmeni",
    "Hayvan Satıcısı (2)", 
    "Şeker Rafinerisi"
];

products = [
    "Buğday", 
    "Arpa", 
    "Yulaf", 
    "Kanola", 
    "Ayçiçeği", 
    "Soya Fasulyesi",
    "Mısır", 
    "Şeker Pancarı", 
    "Patates", 
    "Pamuk", 
    "Çim", 
    "Kuru Ot",
    "Saman", 
    "Silaj", 
    "Süt", 
    "Yumurta", 
    "Yün", 
    "Kereste", 
    "Şeker Kamışı",
    "Üzüm", 
    "Zeytin", 
    "Süpürge Darısı", 
    "Kavak", 
    "Gübre", 
    "Sulu Gübre"
];
}

// Save data to localStorage
function saveCropsData() {
    localStorage.setItem('fs22companion_crops', JSON.stringify(cropsData));
}

function savePricesData() {
    localStorage.setItem('fs22companion_prices', JSON.stringify(pricesData));
}

function saveTasksData() {
    localStorage.setItem('fs22companion_tasks', JSON.stringify(tasksData));
}

function saveNotesData() {
    localStorage.setItem('fs22companion_notes', JSON.stringify(notesData));
}

// Set up event listeners
function setupEventListeners() {
    // Tab navigation
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });

    // Export/Import buttons
    document.getElementById('export-data').addEventListener('click', exportData);
    document.getElementById('import-data').addEventListener('click', importData);
    document.getElementById('reset-data').addEventListener('click', confirmResetData);

    // Modal buttons
    document.getElementById('modal-cancel').addEventListener('click', closeModal);
    document.getElementById('modal-confirm').addEventListener('click', confirmAction);
    document.getElementById('data-modal-cancel').addEventListener('click', closeDataModal);
    document.getElementById('data-modal-action').addEventListener('click', copyDataToClipboard);
}

// Show the selected tab and hide others
function showTab(tabId) {
    // Update tab buttons
    tabButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tabId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Update content sections
    contentSections.forEach(section => {
        if (section.id === tabId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Update current date display
function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('tr-TR', options);
}

// Simulate game time (updates every minute)
function updateGameTime() {
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        gameTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Başlangıçta güncelle
    updateClock();
    
    // Her saniye güncelle
    setInterval(updateClock, 1000);
}

// Initialize Crop Calendar section
function initCropCalendar() {
    const cropTableBody = document.querySelector('#crop-table tbody');
    const cropSearch = document.getElementById('crop-search');
    const monthFilter = document.getElementById('month-filter');
    const closeDetailsBtn = document.getElementById('close-details');
    
    // Render crop table
    renderCropTable();
    
    // Set up event listeners
    cropSearch.addEventListener('input', filterCrops);
    monthFilter.addEventListener('change', filterCrops);
    closeDetailsBtn.addEventListener('click', hideCropDetails);
    
    // Function to render crop table
    // Function to render crop table
function renderCropTable(filteredCrops = null) {
    const cropsToRender = filteredCrops || cropsData;
    
    cropTableBody.innerHTML = '';
    
    cropsToRender.forEach(crop => {
        const row = document.createElement('tr');
        row.dataset.cropId = crop.id;
        
        // Türkçe ay isimleri için dizi
        const monthsTR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
        
        // Format sowing months - DÜZELTME BURADA
        const sowingMonths = crop.sowingMonths.map(month => {
            return monthsTR[month - 1]; // Diziden Türkçe ay ismini al
        }).join(', ');
        
        // Format harvest months - DÜZELTME BURADA
        const harvestMonths = crop.harvestMonths.map(month => {
            return monthsTR[month - 1]; // Diziden Türkçe ay ismini al
        }).join(', ');
        
        row.innerHTML = `
            <td>${crop.name}</td>
            <td>${sowingMonths}</td>
            <td>${harvestMonths}</td>
            <td>${crop.growthTime}</td>
            <td>${crop.yield}</td>
        `;
        
        row.addEventListener('click', () => showCropDetails(crop.id));
        cropTableBody.appendChild(row);
    });
}
    
    // Function to filter crops based on search and month filter
    function filterCrops() {
        const searchTerm = cropSearch.value.toLowerCase();
        const selectedMonth = monthFilter.value;
        
        let filtered = cropsData.filter(crop => {
            const matchesSearch = crop.name.toLowerCase().includes(searchTerm);
            let matchesMonth = true;
            
            if (selectedMonth !== 'all') {
                const monthNum = parseInt(selectedMonth);
                matchesMonth = crop.sowingMonths.includes(monthNum) || crop.harvestMonths.includes(monthNum);
            }
            
            return matchesSearch && matchesMonth;
        });
        
        renderCropTable(filtered);
    }
    
    // Function to show crop details
    function showCropDetails(cropId) {
        const crop = cropsData.find(c => c.id === cropId);
        if (!crop) return;
        
        const detailSection = document.getElementById('crop-details');
        document.getElementById('detail-crop-name').textContent = crop.name;
        document.getElementById('detail-soil').textContent = crop.bestSoil;
        document.getElementById('detail-price').textContent = crop.priceRange;
        document.getElementById('detail-equipment').textContent = crop.equipment;
        document.getElementById('detail-notes').textContent = crop.notes;
        
        // Set image (placeholder in this case)
        document.getElementById('detail-crop-image').src = `images/crops/${crop.name.toLowerCase()}.png`;
        document.getElementById('detail-crop-image').alt = crop.name;
        
        detailSection.style.display = 'block';
        
        // Scroll to details
        setTimeout(() => {
            detailSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
    
    // Function to hide crop details
    function hideCropDetails() {
        document.getElementById('crop-details').style.display = 'none';
    }
}

// Initialize Price Tracker section
function initPriceTracker() {
    const productSelect = document.getElementById('product-select');
    const sellPointSelect = document.getElementById('sell-point');
    const calculateBtn = document.getElementById('calculate-btn');
    const savePriceBtn = document.getElementById('save-price-btn');
    const historyProductSelect = document.getElementById('history-product');
    const historyLocationSelect = document.getElementById('history-location');
    const viewHistoryBtn = document.getElementById('view-history');
    
    // Populate product and sell point dropdowns
    populateDropdowns();
    
    // Set up event listeners
    calculateBtn.addEventListener('click', calculateProfit);
    savePriceBtn.addEventListener('click', savePriceData);
    viewHistoryBtn.addEventListener('click', viewPriceHistory);
    
    // Function to populate dropdowns
    function populateDropdowns() {
        // Clear existing options
        productSelect.innerHTML = '<option value="">Bir ürün seçin</option>';
        sellPointSelect.innerHTML = '<option value="">Bir satış noktası seçin</option>';
        historyProductSelect.innerHTML = '<option value="">Geçmişi görüntülemek için ürünü seçin</option>';
        historyLocationSelect.innerHTML = '<option value="">Konum seçin</option>';
        
        // Add products
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product;
            option.textContent = product;
            productSelect.appendChild(option);
            
            const historyOption = option.cloneNode(true);
            historyProductSelect.appendChild(historyOption);
        });
        
        // Add sell points
        sellPoints.forEach(point => {
            const option = document.createElement('option');
            option.value = point;
            option.textContent = point;
            sellPointSelect.appendChild(option);
            
            const historyOption = option.cloneNode(true);
            historyLocationSelect.appendChild(historyOption);
        });
        
        // Update best prices table
        updateBestPricesTable();
    }
    
    // Function to calculate profit
    function calculateProfit() {
        const product = productSelect.value;
        const sellPoint = sellPointSelect.value;
        const price = parseFloat(document.getElementById('current-price').value);
        const quantity = parseFloat(document.getElementById('quantity').value);
        const unit = document.getElementById('unit-type').value;
        
        if (!product || !sellPoint || isNaN(price) || isNaN(quantity)) {
            showToast('Lütfen tüm alanları geçerli değerlerle doldurun');
            return;
        }
        
        const total = price * quantity;
        
        // Update result display
        document.getElementById('result-product').textContent = product;
        document.getElementById('result-point').textContent = sellPoint;
        document.getElementById('result-price').textContent = price.toFixed(2);
        document.getElementById('result-unit').textContent = unit;
        document.getElementById('result-quantity').textContent = quantity.toFixed(2);
        document.getElementById('result-quantity-unit').textContent = unit;
        document.getElementById('total-profit').textContent = `${total.toFixed(2)} €`;
    }
    
    // Function to save price data
    function savePriceData() {
        const product = productSelect.value;
        const sellPoint = sellPointSelect.value;
        const price = parseFloat(document.getElementById('current-price').value);
        const quantity = parseFloat(document.getElementById('quantity').value);
        const unit = document.getElementById('unit-type').value;
        
        if (!product || !sellPoint || isNaN(price) || isNaN(quantity)) {
            showToast('Lütfen tüm alanları geçerli değerlerle doldurun');
            return;
        }
        
        const newPrice = {
            id: Date.now(),
            product,
            sellPoint,
            price,
            date: new Date().toISOString().split('T')[0],
            quantity,
            unit
        };
        
        pricesData.push(newPrice);
        savePricesData();
        
        showToast('Fiyat verileri başarıyla kaydedildi!');
        
        // Update best prices table
        updateBestPricesTable();
        
        // Clear form
        document.getElementById('current-price').value = '';
        document.getElementById('quantity').value = '';
    }
    
    // Function to update best prices table
    function updateBestPricesTable() {
        const bestPriceTable = document.querySelector('#best-price-table tbody');
        bestPriceTable.innerHTML = '';
        
        // Group prices by product and find the best price for each
        const productsBestPrices = {};
        
        pricesData.forEach(price => {
            if (!productsBestPrices[price.product]) {
                productsBestPrices[price.product] = price;
            } else if (price.price > productsBestPrices[price.product].price) {
                productsBestPrices[price.product] = price;
            }
        });
        
        // Add rows to the table
        Object.values(productsBestPrices).forEach(price => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${price.product}</td>
                <td>${price.price.toFixed(2)} €</td>
                <td>${price.sellPoint}</td>
            `;
            bestPriceTable.appendChild(row);
        });
    }
    
    // Function to view price history
    function viewPriceHistory() {
        const product = historyProductSelect.value;
        const location = historyLocationSelect.value;
        
        let filteredPrices = pricesData;
        
        if (product) {
            filteredPrices = filteredPrices.filter(p => p.product === product);
        }
        
        if (location) {
            filteredPrices = filteredPrices.filter(p => p.sellPoint === location);
        }
        
        // Sort by date (newest first)
        filteredPrices.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Update history table
        const historyTable = document.querySelector('#history-table tbody');
        historyTable.innerHTML = '';
        
        filteredPrices.forEach(price => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${price.date}</td>
                <td>${price.price.toFixed(2)} €</td>
                <td>${price.sellPoint}</td>
                <td>
                    <button class="btn-delete-price" data-id="${price.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            historyTable.appendChild(row);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.btn-delete-price').forEach(btn => {
            btn.addEventListener('click', function() {
                const priceId = parseInt(this.getAttribute('data-id'));
                deletePriceRecord(priceId);
            });
        });
        
        // Update chart
        updatePriceChart(filteredPrices);
    }
    
    // Function to update price chart
    function updatePriceChart(prices) {
        const ctx = document.getElementById('price-chart').getContext('2d');
        
        // Group prices by date and calculate average price per day
        const pricesByDate = {};
        
        prices.forEach(price => {
            if (!pricesByDate[price.date]) {
                pricesByDate[price.date] = {
                    total: price.price,
                    count: 1
                };
            } else {
                pricesByDate[price.date].total += price.price;
                pricesByDate[price.date].count += 1;
            }
        });
        
        const dates = Object.keys(pricesByDate).sort();
        const averagePrices = dates.map(date => {
            return (pricesByDate[date].total / pricesByDate[date].count).toFixed(2);
        });
        
        // Destroy previous chart if it exists
        if (priceChart) {
            priceChart.destroy();
        }
        
        // Create new chart
        priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Ortalama Fiyat (€)',
                    data: averagePrices,
                    backgroundColor: 'rgba(74, 143, 41, 0.2)',
                    borderColor: 'rgba(74, 143, 41, 1)',
                    borderWidth: 2,
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Fiyat Geçmişi'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }
    
    // Function to delete price record
    function deletePriceRecord(priceId) {
        showConfirmationModal(
            'Fiyat Kaydını Sild',
            'Bu fiyat kaydını silmek istediğinizden emin misiniz?',
            () => {
                pricesData = pricesData.filter(p => p.id !== priceId);
                savePricesData();
                viewPriceHistory();
                updateBestPricesTable();
                showToast('Fiyat kaydı başarıyla silindi');
            }
        );
    }
}

// Initialize Task Manager section
function initTaskManager() {
    const taskForm = document.querySelector('.task-form');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Render tasks
    renderTasks();
    
    // Set up event listeners
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewTask();
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderTasks(this.dataset.filter);
        });
    });
    
    // Function to render tasks
    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        
        let tasksToRender = tasksData;
        
        // Apply filter
        if (filter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            tasksToRender = tasksData.filter(task => task.dueDate === today);
        } else if (filter === 'pending') {
            tasksToRender = tasksData.filter(task => !task.completed);
        } else if (filter === 'completed') {
            tasksToRender = tasksData.filter(task => task.completed);
        }
        
        // Sort tasks: incomplete first, then by due date
        tasksToRender.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
        
        // Add tasks to the list
        tasksToRender.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;
            taskItem.dataset.taskId = task.id;
            
            const dueDate = new Date(task.dueDate).toLocaleDateString('tr-TR', { 
                month: 'short', 
                day: 'numeric',
                year: task.dueDate.split('-')[0] !== new Date().getFullYear().toString() ? 'numeric' : undefined
            });
            
            taskItem.innerHTML = `
    <div class="task-content">
        <div class="task-title">${task.title}</div>
        <div class="task-meta">
            ${task.field ? `<span class="task-field">Tarla ${task.field}</span>` : ''}
            <span class="task-due">Son Tarih: ${dueDate}</span>
        </div>
    </div>
    <div class="task-actions">
        <button class="task-btn complete" title="${task.completed ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}">
            <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
        </button>
        <button class="task-btn edit" title="Görevi düzenle">
            <i class="fas fa-edit"></i>
        </button>
        <button class="task-btn delete" title="Görevi sil">
            <i class="fas fa-trash"></i>
        </button>
    </div>
`;
            
            // Add event listeners to buttons
            const completeBtn = taskItem.querySelector('.complete');
            const editBtn = taskItem.querySelector('.edit');
            const deleteBtn = taskItem.querySelector('.delete');
            
            completeBtn.addEventListener('click', () => toggleTaskComplete(task.id));
            editBtn.addEventListener('click', () => editTask(task.id));
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            
            taskList.appendChild(taskItem);
        });
    }
    
    // Function to add new task
    function addNewTask() {
        const title = document.getElementById('task-name').value.trim();
        const field = document.getElementById('task-field').value.trim();
        const dueDate = document.getElementById('task-date').value;
        const priority = document.getElementById('task-priority').value;
        
        if (!title) {
            showToast('Lütfen bir görev başlığı girin');
            return;
        }
        
        const newTask = {
            id: Date.now(),
            title,
            field,
            dueDate: dueDate || new Date().toISOString().split('T')[0],
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasksData.push(newTask);
        saveTasksData();
        
        // Clear form
        document.getElementById('task-name').value = '';
        document.getElementById('task-field').value = '';
        document.getElementById('task-date').value = '';
        document.getElementById('task-priority').value = 'medium';
        
        // Update task list
        renderTasks();
        
        showToast('Görev başarıyla eklendi!');
    }
    
    // Function to toggle task completion status
    function toggleTaskComplete(taskId) {
        const taskIndex = tasksData.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            tasksData[taskIndex].completed = !tasksData[taskIndex].completed;
            saveTasksData();
            renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
        }
    }
    
    // Function to edit task
    function editTask(taskId) {
        const task = tasksData.find(t => t.id === taskId);
        if (!task) return;
        
        // Fill the form with task data
        document.getElementById('task-name').value = task.title;
        document.getElementById('task-field').value = task.field;
        document.getElementById('task-date').value = task.dueDate;
        document.getElementById('task-priority').value = task.priority;
        
        // Remove the task from the list
        tasksData = tasksData.filter(t => t.id !== taskId);
        saveTasksData();
        
        // Update task list
        renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
        
        showToast('Görev düzenleme için yüklendi. Güncelleyin ve değişiklikleri kaydetmek için "Görev Ekle"ye tıklayın.');
    }
    
    // Function to delete task
    function deleteTask(taskId) {
        showConfirmationModal(
            'Görevi Sil',
            'Bu görevi silmek istediğinizden emin misiniz?',
            () => {
                tasksData = tasksData.filter(t => t.id !== taskId);
                saveTasksData();
                renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
                showToast('Görev başarıyla silindi');
            }
        );
    }
}

// Initialize Notes section
function initNotes() {
    const noteForm = document.querySelector('.notes-form');
    const notesList = document.getElementById('notes-list');
    const noteSearch = document.getElementById('note-search');
    const noteCategoryFilter = document.getElementById('note-category-filter');
    
    // Render notes
    renderNotes();
    
    // Set up event listeners
    noteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveNote();
    });
    
    noteSearch.addEventListener('input', filterNotes);
    noteCategoryFilter.addEventListener('change', filterNotes);
    
    // Function to render notes
    function renderNotes(filteredNotes = null) {
        notesList.innerHTML = '';
        
        const notesToRender = filteredNotes || notesData;
        
        // Sort notes by updated date (newest first)
        const sortedNotes = [...notesToRender].sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        
        sortedNotes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.dataset.noteId = note.id;
            
            const createdAt = new Date(note.createdAt).toLocaleDateString('tr-TR', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            const updatedAt = new Date(note.updatedAt).toLocaleDateString('tr-TR', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            noteItem.innerHTML = `
    <div class="note-header">
        <div class="note-title">${note.title}</div>
        <div class="note-category ${note.category}">
            ${note.category === 'general' ? 'Genel' : 
              note.category === 'fields' ? 'Tarlalar' :
              note.category === 'animals' ? 'Hayvanlar' :
              note.category === 'equipment' ? 'Ekipmanlar' : 
              note.category === 'finance' ? 'Finans' : note.category}
        </div>
    </div>
    <div class="note-content">${note.content.replace(/\n/g, '<br>')}</div>
    <div class="note-date">Oluşturulma: ${createdAt} | Güncellenme: ${updatedAt}</div>
    <div class="note-actions">
        <button class="note-btn edit" title="Notu düzenle">
            <i class="fas fa-edit"></i>
        </button>
        <button class="note-btn delete" title="Notu sil">
            <i class="fas fa-trash"></i>
        </button>
    </div>
`;
            
            // Add event listeners to buttons
            const editBtn = noteItem.querySelector('.edit');
            const deleteBtn = noteItem.querySelector('.delete');
            
            editBtn.addEventListener('click', () => editNote(note.id));
            deleteBtn.addEventListener('click', () => deleteNote(note.id));
            
            notesList.appendChild(noteItem);
        });
    }
    
    // Function to filter notes
    function filterNotes() {
        const searchTerm = noteSearch.value.toLowerCase();
        const selectedCategory = noteCategoryFilter.value;
        
        let filtered = notesData.filter(note => {
            const matchesSearch =
                note.title.toLowerCase().includes(searchTerm) ||
                note.content.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        renderNotes(filtered);
    }
    
    // Function to save note
    function saveNote() {
        const title = document.getElementById('note-title').value.trim();
        const content = document.getElementById('note-content').value.trim();
        const category = document.getElementById('note-category').value;
        
        if (!title || !content) {
            showToast('Lütfen not için bir başlık ve içerik girin.');
            return;
        }
        
        const existingNoteId = document.getElementById('note-form').dataset.editing;
        if (existingNoteId) {
            const noteIndex = notesData.findIndex(n => n.id == existingNoteId);
            if (noteIndex !== -1) {
                notesData[noteIndex].title = title;
                notesData[noteIndex].content = content;
                notesData[noteIndex].category = category;
                notesData[noteIndex].updatedAt = new Date().toISOString();
                showToast('Not başarıyla güncellendi.');
            }
            delete document.getElementById('note-form').dataset.editing;
        } else {
            const newNote = {
                id: Date.now(),
                title,
                content,
                category,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            notesData.push(newNote);
            showToast('Not başarıyla eklendi.');
        }
        
        saveNotesData();
        renderNotes();
        
        // Clear form
        document.getElementById('note-title').value = '';
        document.getElementById('note-content').value = '';
        document.getElementById('note-category').value = 'general';
    }
    
    // Function to edit note
    function editNote(noteId) {
        const note = notesData.find(n => n.id === noteId);
        if (!note) return;
        
        document.getElementById('note-title').value = note.title;
        document.getElementById('note-content').value = note.content;
        document.getElementById('note-category').value = note.category;
        document.getElementById('note-form').dataset.editing = note.id;
    }
    
    // Function to delete note
    function deleteNote(noteId) {
        showConfirmationModal(
            'Notu Sil',
            'Bu notu silmek istediğinizden emin misiniz?',
            () => {
                notesData = notesData.filter(n => n.id !== noteId);
                saveNotesData();
                renderNotes();
                showToast('Not başarıyla silindi.');
            }
        );
    }
}

// Modal functions
function closeModal() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

function closeDataModal() {
    document.getElementById('data-modal').style.display = 'none';
}

function confirmAction() {
    // This function is called when the modal confirm button is clicked
    // The actual action is set in showConfirmationModal
    closeModal();
}

function copyDataToClipboard() {
    const data = {
        crops: cropsData,
        prices: pricesData,
        tasks: tasksData,
        notes: notesData
    };
    
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
        .then(() => {
            showToast('Veriler panoya kopyalandı!');
            closeDataModal();
        })
        .catch(err => {
            showToast('Veriler panoya kopyalanamadı', 'error');
            console.error('Kopyalanamadı: ', err);
        });
}

// Data export/import functions
function exportData() {
    const data = {
        crops: cropsData,
        prices: pricesData,
        tasks: tasksData,
        notes: notesData
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'fs22-asistan-data-export.json';
    a.click();

    URL.revokeObjectURL(url);
    showToast('Veriler JSON olarak başarıyla dışa aktarıldı.');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const imported = JSON.parse(e.target.result);
                if (imported.crops) cropsData = imported.crops;
                if (imported.prices) pricesData = imported.prices;
                if (imported.tasks) tasksData = imported.tasks;
                if (imported.notes) notesData = imported.notes;

                saveCropsData();
                savePricesData();
                saveTasksData();
                saveNotesData();

                location.reload();
                showToast('Veriler başarıyla içe aktarıldı.');
            } catch (err) {
                showToast('Geçersiz veri dosyası.', 'error');
            }
        };
        reader.readAsText(file);
    });

    input.click();
}

function confirmResetData() {
    showConfirmationModal(
        'Tüm Verileri Sıfırla',
        'Kaydedilen tüm verileriniz silinecek. Devam etmek istediğinizden emin misiniz?',
        () => {
            localStorage.clear();
            location.reload();
        }
    );
}

// UI helper functions
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function showConfirmationModal(title, message, onConfirm) {
    const modal = document.getElementById('confirmation-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    modal.style.display = 'block';

    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn = document.getElementById('modal-cancel');

    const handler = () => {
        modal.style.display = 'none';
        confirmBtn.removeEventListener('click', handler);
        onConfirm();
    };

    confirmBtn.addEventListener('click', handler);

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        confirmBtn.removeEventListener('click', handler);
    });
}
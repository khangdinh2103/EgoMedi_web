// Medical Tests Interactive JavaScript

// Test data for different medical tests
const testData = {
    'cancer-screening': {
        title: 'Tầm soát ung thư',
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/img_tab_1.jpg?1705909553460',
        description: `
            <p>
                Mỗi năm Việt Nam có hơn 126.000 ca mắc mới mắc bệnh ung thư, trong số đó 
                khoảng 94.000 người tử vong vì phát hiện quá muộn. Việt Nam cũng là một 
                trong những quốc gia có tỷ lệ người dân đi tầm soát ung thư thấp nhất. Nếu 
                được tầm soát và phát hiện sớm, những căn bệnh ung thư sau có thể chữa 
                khỏi hoàn toàn:
            </p>
            
            <div class="space-y-2">
                <div class="flex items-center">
                    <i class="fas fa-check text-cyan-500 mr-3"></i>
                    <span><strong class="text-gray-500">Ung thư phổi</strong></span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-check text-cyan-500 mr-3"></i>
                    <span><strong class="text-gray-500">Ung thư gan</strong></span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-check text-cyan-500 mr-3"></i>
                    <span><strong class="text-gray-500">Ung thư da</strong></span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-check text-cyan-500 mr-3"></i>
                    <span><strong class="text-gray-500">Ung thư vú</strong></span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-check text-cyan-500 mr-3"></i>
                    <span><strong class="text-gray-500">Ung thư cổ tử cung</strong></span>
                </div>
            </div>
            
            <p>
                Tầm soát ung thư là phương thức chẩn đoán nhằm phát hiện ra mầm mống 
                ung thư hoặc khi khối u c...
            </p>
        `
    },
    'histology': {
        title: 'Mô học',
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/img_tab_2.jpg?1705909553460',
        description: `
            <p>
                Xét nghiệm chẩn đoán mô bệnh học là xét nghiệm thực hiện trên mẫu mô sau sinh thiết nội soi, sinh thiết kim hoặc trong bệnh phẩm phẫu thuật. Bệnh phẩm được bảo quản trong môi trường formol pha theo tỷ lệ quy định rồi được chuyển về phòng xét nghiệm giải phẫu bệnh. 
Tại đây, mẫu bệnh phẩm được xử lí theo đúng quy trình xét nghiệm để đưa ra kết quả chính xác nhất. Kết quả xét nghiệm này là tiêu chuẩn vàng trong chẩn đoán bệnh lí ác tính. 
</br>Xét nghiệm chẩn đoán hóa mô miễn dịch nhằm giúp xác định chính xác nguồn gốc của các khối u kém biệt hóa. Xét nghiệm này thường đ...
            </p>
            
            
            
        `
    },
    'general-exam': {
        title: 'Khám tổng quát',
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/img_tab_3.jpg?1705909553460',
        description: `
            <p>
               – Xét nghiệm chỉ số máu (nhằm phát hiện tình trạng thiếu máu và một số bệnh lý về máu, chẩn đoán tiểu đường và dung nạp Glucose, đánh giá chức năng thận, chức năng gan, tầm soát virus viêm gan B…)

</br>– Xét nghiệm nước tiểu, nhằm phát hiện một số bệnh lý về thận, tiết niệu…

</br>– Chẩn đoán hình ảnh, thăm dò chức năng (gồm: Chụp X Quang ngực thẳng, điện tim đồ, siêu âm ổ bụng tổng quát thường, chụp CT…).

Tự hào là bệnh viện lớn, được xây dựng theo tiêu chuẩn “Bệnh viện – Khách sạn và lọt Top 3 bệnh viện có điểm chất lượng cao nhất – Bệnh viện ĐKQT Ego Medical là địa chỉ uy tín được nhiều doanh nghiệp đăng...
            </p>
            
        `
    },
    'blood-test': {
        title: 'Xét nghiệm máu',
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/img_tab_4.jpg?1705909553460',
        description: `
            <p>
Có rất nhiểu bệnh có thể phát hiện được qua xét nghiệm máu. Thông thường khi khám sức khỏe bác sĩ sẽ chỉ định thực hiện những xét nghiệm máu sau:
            </p>
            
            <div class="space-y-2">
                <div class="flex items-center">
                    <i class="fas fa-check text-cyan-500 mr-3"></i>
                    <span>Xét nghiệm công thức máu</span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-check text-cyan-500 mr-3"></i>
                    <span>Xét nghiệm đường máu</span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-check text-cyan-500 mr-3"></i>
                    <span>Xét nghiệm mỡ máu</span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-check text-cyan-500 mr-3"></i>
                    <span>Xét nghiệm viêm gan B</span>
                </div>
                <div class="flex items-center">
                    <i class="fas fa-check text-cyan-500 mr-3"></i>
                    <span>Xét nghiệm HIV</span>
                </div>

            </div>
            
            <p>
                Tại khoa phòng cụ thể, các bác sĩ sẽ căn cứ vào tình trạng sức khoẻ và những yếu tố nguy cơ bệnh để chỉ định làm xét nghiệm máu.

</br>Tới tầng 7 – Đơn vị xét nghiệm Bệnh viện Ego Medical. Người bệnh được chuyên viên y tế bệnh viện lấy máu xét nghiệm.

</br>Các dụng cụ lấy máu đều đảm bảo tính vệ sinh, vô ...
            </p>
        `
    },
    'genetic-test': {
        title: 'Xét nghiệm di truyền',
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/img_tab_5.jpg?1705909553460',
        description: `
            <p>
                <strong class="text-gray-500">Xét nghiệm di truyền</strong>  hay còn được gọi là xét nghiệm DNA, cho phép phân tích gen có khả năng gây bệnh di truyền, và cũng có thể được sử dụng để xác định quan hệ cha con/ mẹ con hoặc truy nguyên nguồn gốc tổ tiên của một người hoặc các mối quan hệ huyết thống giữa những người tham gia.

</br>Bên cạnh đó, các nghiên cứu ở mức độ nhiễm sắc thể của con người theo hướng rộng mở bao gồm xét nghiệm sinh hóa tìm kiếm khả năng hiện diện của các bệnh di truyền, hoặc dạng đột biến của các gen quan trọng gia tăng nguy cơ của các rối loạn di truyền. Xét nghiệm di truyền học xác định sự thay đổi trong nhiễm s...
            </p>
        `
    },
    'cytology': {
        title: 'Tế bào học',
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/img_tab_6.jpg?1705909553460',
        description: `
            <p>
                <strong class="text-gray-500">Xét nghiệm tế bào học</strong> (Cytology hoặc Cytopathology) là xét nghiệm thông 
                dụng và có giá trị cao. Xét nghiệm tế bào học khảo sát các tế bào rời hoặc một 
                cụm tế bào lẻ trong chất dịch lồng thay được trên kính hiển vi. Có khi chỉ cần 
                một giọt máu hoặc chất dịch như trong xét nghiệm FNA, nhưng có khi phải 
                cần đến cả chai chất <span class="font-semibold text-gray-800">dịch màng phổi</span> hoặc ổ bụng.
            </p>
            
            <p>
                Lấy một mẫu thử tế bào, it gây mệt, ít gây biến chứng và đỡ tốn kém hơn cho 
                người bệnh so với sinh thiết mô bệnh học.
            </p>
            
            <p>
                Trong nhiều trường hợp, <span class="font-semibold text-gray-800">sinh thiết</span> cho kết quả chính xác hơn. Tuy nhiên, với 
                một số trường hợp...
            </p>
        `
    }
};

/**
 * Initialize Medical Tests Interactive Functionality
 */
function initMedicalTests() {
    const testItems = document.querySelectorAll('.test-item');
    const testTitle = document.getElementById('test-title');
    const testImage = document.getElementById('test-image');
    const testDescription = document.getElementById('test-description');

    // Check if elements exist
    if (!testItems.length || !testTitle || !testImage || !testDescription) {
        console.warn('Medical tests elements not found');
        return;
    }

    // Set initial active state
    setActiveTest('cancer-screening');
    
    // Set initial active button (first button with cancer-screening)
    const initialActiveButton = document.querySelector('[data-test="cancer-screening"]');
    if (initialActiveButton) {
        updateActiveState(initialActiveButton);
    }

    // Add click event listeners to test items
    testItems.forEach(item => {
        item.addEventListener('click', function() {
            const testType = this.getAttribute('data-test');
            if (testType) {
                setActiveTest(testType);
                updateActiveState(this);
            }
        });
    });

    /**
     * Set active test content
     * @param {string} testType - The type of test to display
     */
    function setActiveTest(testType) {
        const data = testData[testType];
        if (data) {
            testTitle.textContent = data.title;
            testImage.src = data.image;
            testImage.alt = data.title;
            testDescription.innerHTML = data.description;
        }
    }

    /**
     * Update visual active state of test items
     * @param {HTMLElement} activeItem - The item to set as active
     */
    function updateActiveState(activeItem) {
        // Remove active state from all items và reset về trạng thái ban đầu
        testItems.forEach(item => {
            // Reset về trạng thái mặc định
            item.classList.remove('bg-cyan-500', 'text-white');
            item.classList.add('bg-white', 'hover:bg-cyan-500', 'group');
            
            const iconImg = item.querySelector('img');
            const title = item.querySelector('h3');
            
            if (iconImg) {
                iconImg.classList.remove('invert', 'brightness-0', 'contrast-200');
                iconImg.classList.add('group-hover:invert', 'group-hover:brightness-0', 'group-hover:contrast-200');
            }
            
            if (title) {
                title.classList.remove('!text-white');
                title.classList.add('text-gray-800', 'group-hover:text-white');
            }
        });

        // Add active state to clicked item
        activeItem.classList.remove('bg-white', 'hover:bg-cyan-500', 'group');
        activeItem.classList.add('bg-cyan-500', 'text-white');
        
        const activeIconImg = activeItem.querySelector('img');
        const activeTitle = activeItem.querySelector('h3');
        
        if (activeIconImg) {
            activeIconImg.classList.remove('group-hover:invert', 'group-hover:brightness-0', 'group-hover:contrast-200');
            activeIconImg.classList.add('invert', 'brightness-0', 'contrast-200');
        }
        
        if (activeTitle) {
            activeTitle.classList.remove('text-gray-800', 'group-hover:text-white');
            activeTitle.classList.add('!text-white');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMedicalTests();
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initMedicalTests, testData };
}

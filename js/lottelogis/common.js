$(function () {});

// Form : File
const fileUI = () => {
    const $file = $(".file");

    // 파일 추가
    $file.on("change", function () {
        const file = $(this)[0].files[0];
        const $fileWrap = $(this).parent(".file-btn-wrap");
        const $name = $fileWrap.siblings(".file-name");

        if (file !== undefined) {
            $name.text(file.name);
            $fileWrap.siblings(".btn-file-delete").remove();
            $fileWrap.parent().append(`
                <button type="button" class="btn btn-sm btn-round-x btn-file-delete">
                    ×
                </button>
            `);
        }
    });

    // 삭제 버튼
    $(".file-wrap").on("click", ".btn-file-delete", function () {
        $(this).siblings(".file-btn-wrap").children(".file").val("");
        $(this).siblings(".file-name").text("선택된 파일 없음");
        $(this).remove();
    });
};

/** Form : Image File
    ext : 사용 할 확장자 배열
    size : 파일 용량. 단위는 MB
    warn : 확장자와 용량이 맞지 않을 때 나올 경고 메세지

    fileImgUI({
        ext: ["jpg", "jpeg", "png"],
        size: "5",
        warn: "5MB이하 용량의 jpg, jpeg, png 파일만 첨부 가능합니다.",
    });
**/
const fileImgUI = (info) => {
    const $file = $(".file-img");

    // 이미지 추가
    $file.on("change", function () {
        const file = $(this)[0].files[0];
        const fileExt = file.name.split(".").pop().toLowerCase();
        const arrExt = info.ext;
        let limitSize, checkSize;
        const $fileWrap = $(this).closest(".file-btn-wrap");
        const $name = $fileWrap.siblings(".file-name");
        const $btn = $fileWrap.siblings(".btn-post");

        // 용량 체크
        if (info.size !== undefined) {
            limitSize = 1024 ** 2 * info.size;
            file.size < limitSize ? (checkSize = true) : (checkSize = false);
        } else {
            checkSize = true;
        }

        // 이미지 담기, 미리보기
        if (arrExt.includes(fileExt) && checkSize) {
            $name.text(file.name);
            $btn.removeClass("disabled").attr("disabled", false);
            $fileWrap.parent().siblings(".preview_wrap").remove();
        } else {
            alert(info.warn);
        }
    });

    // 삭제 버튼
    $(".file-img-wrap").on("click", ".btn-file-delete", function () {
        const $preview = $(this).parent(".preview_wrap");
        const $control = $preview.siblings(".file-img-control");

        $control.children(".btn-post").addClass("disabled").attr("disabled", true);
        $control.children(".file-btn-wrap").children(".file-img").val("");
        $control.children(".file-name").text("선택된 파일 없음");
        $preview.remove();
    });
};

// Dual List
const dualList = () => {
    // 리스트 개수
    const count = () => {
        const leftCount = $(".dual-list-left").children().length;
        const rightCount = $(".dual-list-right").children().length;

        $(".dual-list-left").siblings(".menu-desc").children(".count").text(leftCount);
        $(".dual-list-right").siblings(".menu-desc").children(".count").text(rightCount);
    };
    count();

    // 리스트 선택
    $(".dual-list").on("click", "li", function () {
        $(".dual-list li").removeClass("active");
        $(this).toggleClass("active");
    });

    // 오른쪽으로 이동
    $(".btn-send-right").on("click", function () {
        let $moveList = $(this).siblings(".dual-list").children(".active");
        const $rightList = $(this).parent().siblings().children(".dual-list-right");

        $rightList.prepend($moveList);
        $rightList.children().removeClass("active");
        count();
    });

    // 왼쪽으로 이동
    $(".btn-send-left").on("click", function () {
        let $moveList = $(this).siblings(".dual-list").children(".active");
        const $leftList = $(this).parent().siblings().children(".dual-list-left");

        $leftList.prepend($moveList);
        $leftList.children().removeClass("active");
        count();
    });
};

// Menu Manage Disabled
const disabledMenu = () => {
    // 1depth 메뉴 링크 및 hover 이벤트 불가
    $(".menu-sorting > .nav > .nav-item > .nav-link").addClass("disabled");
    $(".menu-sorting > .nav > .nav-item > .nav-link").on("click", function (e) {
        e.preventDefault();
    });

    // 모든 메뉴 링크 이벤트 불가
    $(".menu-control").on("click", ".nav-link", function (e) {
        if ($(".menu-control").hasClass("disabled")) {
            e.preventDefault();
        }
    });
};

$(function () {
  closePopup(); // 창 닫기
  valueLength(); // 글자수 체크
  fileAttach(fileCondition); // 첨부파일 추가
  emailSelectDirect(); // 이메일 직접선택
});

// 창 닫기
const closePopup = () => {
  $('.pop_wrap').on('click', '.btn_close', () => {
    window.close();
  });
};

// 글자수 체크
const valueLength = () => {
  $('input.limit_value').siblings().children('.text_count').text($('.limit_value').val().length);
  $('textarea.limit_value').siblings().children('.text_count').text($('.limit_value').text().length);

  $('.limit_value').on('change keyup paste', e => {
    const target = $(e.currentTarget);
    const byte = target.siblings().children('.text_count');

    byte.text(target.val().length);
  });
};

// 첨부파일 추가
const fileCondition = {
  limit: 5,
  size: 5,
  type: ['jpg', 'jpeg', 'png', 'gif', 'pdf'],
};

const fileAttach = condition => {
  const fileList = []; // 첨부파일 객체 배열로 저장

  // 파일 추가
  $('.file').on('change', e => {
    const file = e.target.files?.[0];
    const fileType = file.name.split('.').pop()?.toLowerCase() || '';
    const limitSize = 1024 ** 2 * condition.size;
    const isValidType = condition.type.includes(fileType); // 확장자 체크
    const isValidSize = file.size < limitSize; // 용량 체크
    const isLimit = fileList.length < condition.limit; // 개수 체크
    const isSameFile = fileList.some(item => item.name === file.name); // 중복 파일명 체크

    if (!isValidType) return alert(`jpg. jpeg, png, gif, pdf만 등록 가능합니다.`);
    if (!isValidSize || !isLimit) return alert(`첨부파일 개수나 용량을 초과하였습니다.`);
    if (isSameFile) return alert(`이미 등록된 파일입니다.`);

    if (isValidSize && isLimit && !isSameFile) {
      // 파일 리스트 만들기
      fileList.push(file);

      $('.file_list').append(`
            <li>
                ${file.name}
                <button class="btn_file_delete" type="button"><i class="icon_delete"></i></button>
            </li>
        `);
      $('.file').val('');
    }
  });

  // 파일 삭제
  $('.file_list').on('click', '.btn_file_delete', e => {
    const index = $(e.currentTarget).parent().index();
    fileList.splice(index, 1);
    $(e.currentTarget).parent().remove();
  });
};

// 이메일 직접선택
const emailSelectDirect = () => {
  $('.email_option').on('change', '.selectbox', e => {
    const target = $(e.currentTarget);
    const value = target.val();
    const direct = target.siblings('.email_write');

    if (value === 'direct') {
      direct.focus();
    } else {
      direct.val('');
    }
  });
};

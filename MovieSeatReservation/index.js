// 1번 문제
const loginBtnDom = document.getElementById("theaterLoginBtn");

loginBtnDom.addEventListener("click", loginValidationCheck);

function loginValidationCheck() {
  const email = document.getElementById("email").value;
  const pw = document.getElementById("password").value;

  console.log(email, pw);

  if (isEmpty(email) || isEmpty(pw)) {
    alert("이메일 혹은 비밀번호가 입력되지 않았습니다.");
    return;
  }

  if (!emailValidationCheck(email)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return;
  }

  const pwCheckResult = passwordValidationCheck(pw);

  if (pwCheckResult.result === "FAIL") {
    alert(pwCheckResult.message);
    return;
  }

  alert("로그인 성공!");
}

function isEmpty(str) {
  return !str || str.length === 0;
}

function emailValidationCheck(email) {
  const regex = /^[A-Za-z0-9.]+@[a-z0-9._-]+\.co$/;

  return regex.test(email);
}

function passwordValidationCheck(pw) {
  let returnObj = {
    result: "OK",
    message: "",
  };

  const regex = /[((A-Z)|(a-z))+(0-9)+(!|@|\~)]/;

  if (pw.length < 7 || pw.length > 20) {
    returnObj.result = "FAIL";
    returnObj.message =
      "비밀번호는 최소 8자 이상, 최대 20자 이하로 구성해야 합니다.";
  } else if (!regex.test(pw)) {
    returnObj.result = "FAIL";
    returnObj.message =
      "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.";
  }

  return returnObj;
}

const btnDomArray = document.querySelectorAll(".btn");
const generalBtnDomArray = document.querySelectorAll(".--general");
const youthBtnDomArray = document.querySelectorAll(".--youth");

const seatDomArray = document.querySelectorAll(".seat");
const normalDomArray = Array.from(seatDomArray).filter(
  (dom) =>
    !dom.className.includes("musseukbox") && !dom.className.includes("handicap")
);
const mussDomArray = Array.from(seatDomArray).filter((dom) =>
  dom.className.includes("musseukbox")
);
const handicapSeatDomArray = Array.from(seatDomArray).filter((dom) =>
  dom.className.includes("handicap")
);

const handicapDom = document.getElementById("checkHandicap");

let seatSelectedCount = 0;
let normalSeatSelectedCount = 0;
let mussSeatSelectedCount = 0;
let handicapSeatSelectedCount = 0;
let totalCount = 0;
let generalCount = 0;
let youthCount = 0;

function initPeopleSelection() {
  generalBtnDomArray[0].className = generalBtnDomArray[0].className + " toggle";
  youthBtnDomArray[0].className = youthBtnDomArray[0].className + " toggle";
  checkHandicap.disabled = true;
}

function initSeatSelection() {
  seatDomArray.forEach((dom) => {
    if (dom.className.includes("musseukbox")) {
      dom.className = "seat musseukbox";
    } else if (dom.className.includes("handicap")) {
      dom.className = "seat handicap";
    } else {
      dom.className = "seat";
    }
    seatSelectedCount = 0;
    normalSeatSelectedCount = 0;
    mussSeatSelectedCount = 0;
    handicapSeatSelectedCount = 0;
  });
}

function removeDisabled(dom) {
  dom.className = dom.className.replace(" disabled", "");
}

function makeDisabled(dom) {
  if (!dom.className.includes("disabled")) {
    dom.className = dom.className + " disabled";
  }
}

function removeClicked(dom) {
  dom.className = dom.className.replace(" clicked", "");
}

function makeClicked(dom) {
  if (!dom.className.includes("clicked")) {
    dom.className = dom.className + " clicked";
  }
}

function onClickCountBtn(count, type) {
  // 먼저 해당 dom 을 활성화시키고
  // 다른 dom을 비활성화시킨 다음
  // 좌석들을 활성화시킨다.

  const domArray = type === "general" ? generalBtnDomArray : youthBtnDomArray;
  domArray[count].className = domArray[count].className + " toggle";

  for (let i = 0; i < domArray.length; i++) {
    if (i === count) continue;
    domArray[i].className.replace(" toggle", "");
  }
}

initPeopleSelection();

// 먼저 해당 dom 을 활성화시키고
// 다른 dom을 비활성화시킨 다음
// 좌석들을 활성화시킨다.
for (let i = 0; i < btnDomArray.length; i++) {
  btnDomArray[i].addEventListener("click", function (event) {
    const className = event.target.className;
    const count = parseInt(event.target.textContent);

    generalCount = className.includes("general")
      ? count
      : [...generalBtnDomArray].findIndex((dom) =>
          dom.className.includes("toggle")
        );
    youthCount = className.includes("youth")
      ? count
      : [...youthBtnDomArray].findIndex((dom) =>
          dom.className.includes("toggle")
        );

    totalCount = generalCount + youthCount;

    // 장애인 체크 여부
    if (
      generalCount >= 4 ||
      youthCount >= 4 ||
      generalCount + youthCount >= 4
    ) {
      if (handicapDom.checked) {
        window.alert(
          "머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요."
        );
        return;
      }
      handicapDom.disabled = true;
    } else if (generalCount + youthCount >= 1) {
      handicapDom.disabled = false;
    }

    event.target.className = className + " toggle";

    if (className.includes("general")) {
      for (let j = 0; j < generalBtnDomArray.length; j++) {
        if (j === count) continue;
        generalBtnDomArray[j].className = generalBtnDomArray[
          j
        ].className.replace(" toggle", "");
      }
    } else {
      for (let j = 0; j < youthBtnDomArray.length; j++) {
        if (j === count) continue;
        youthBtnDomArray[j].className = youthBtnDomArray[j].className.replace(
          " toggle",
          ""
        );
      }
    }

    if (seatSelectedCount === 0) {
      seatDomArray.forEach((dom) => {
        if (generalCount !== 0 || youthCount !== 0) {
          removeDisabled(dom);
        } else {
          makeDisabled(dom);
        }
      });
    }

    if (normalSeatSelectedCount > 0) {
      if (seatSelectedCount < totalCount) {
        normalDomArray.forEach((dom) => {
          removeDisabled(dom);
        });
      }

      mussDomArray.forEach((dom) => {
        makeDisabled(dom);
      });

      handicapSeatDomArray.forEach((dom) => {
        makeDisabled(dom);
      });

      handicapDom.disabled = true;
    }

    if (mussSeatSelectedCount > 0) {
      normalDomArray.forEach((dom) => {
        makeDisabled(dom);
      });

      handicapSeatDomArray.forEach((dom) => {
        makeDisabled(dom);
      });

      handicapDom.disabled = true;
    }

    if (handicapSeatSelectedCount > 0) {
      normalDomArray.forEach((dom) => {
        makeDisabled(dom);
      });

      mussDomArray.forEach((dom) => {
        makeDisabled(dom);
      });
    }
  });
}

handicapDom.addEventListener("click", function (event) {
  if (event.target.checked) {
    let isReturn = false;

    handicapSeatDomArray.forEach((dom) => {
      const className = dom.className;
      if (className.includes("clicked")) {
        window.alert("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?");
        initSeatSelection();
        isReturn = true;
        return;
      }
    });

    if (!isReturn) {
      normalDomArray.forEach((dom) => {
        makeDisabled(dom);
      });

      mussDomArray.forEach((dom) => {
        makeDisabled(dom);
      });
    }
  } else {
    initSeatSelection();
  }
});

normalDomArray.forEach((normalDom) => {
  normalDom.addEventListener("click", function (event) {
    const className = event.target.className;
    if (className.includes("disabled")) return;
    const checked = className.includes("clicked");

    if (!checked) {
      makeClicked(event.target);
      normalSeatSelectedCount++;
      seatSelectedCount++;
    } else {
      removeClicked(event.target);
      normalSeatSelectedCount--;
      seatSelectedCount--;
    }

    if (seatSelectedCount === totalCount) {
      seatDomArray.forEach((dom) => {
        if (!dom.className.includes("clicked")) {
          makeDisabled(dom);
        }
      });
    } else {
      normalDomArray.forEach((dom) => {
        removeDisabled(dom);
      });

      mussDomArray.forEach((dom) => {
        if (normalSeatSelectedCount > 0) {
          makeDisabled(dom);
        } else if (normalSeatSelectedCount === 0) {
          removeDisabled(dom);
        }
      });

      handicapSeatDomArray.forEach((dom) => {
        if (normalSeatSelectedCount > 0) {
          makeDisabled(dom);
        } else if (normalSeatSelectedCount === 0) {
          removeDisabled(dom);
        }
      });
    }

    if (normalSeatSelectedCount > 0) {
      handicapDom.disabled = true;
    } else if (normalSeatSelectedCount === 0) {
      handicapDom.disabled = false;
    }
  });
});

mussDomArray.forEach((mussDom) => {
  mussDom.addEventListener("click", function (event) {
    const className = event.target.className;
    if (className.includes("disabled")) return;

    if (
      totalCount % 2 === 1 ||
      generalCount % 2 === 1 ||
      youthCount % 2 === 1
    ) {
      window.alert(
        "선택하신 ‘MUSSEUKBOX’ 좌석은 2인 좌석입니다. 2인 단위로 인원을 선택해주세요."
      );
      return;
    }

    const checked = className.includes("clicked");

    if (!checked) {
      makeClicked(event.target);
      mussSeatSelectedCount++;
      seatSelectedCount++;
    } else {
      removeClicked(event.target);
      mussSeatSelectedCount--;
      seatSelectedCount--;
    }

    if (seatSelectedCount === totalCount) {
      seatDomArray.forEach((dom) => {
        if (!dom.className.includes("clicked")) {
          makeDisabled(dom);
        }
      });
    } else {
      mussDomArray.forEach((dom) => {
        removeDisabled(dom);
      });

      normalDomArray.forEach((dom) => {
        if (mussSeatSelectedCount > 0) {
          makeDisabled(dom);
        } else if (mussSeatSelectedCount === 0) {
          removeDisabled(dom);
        }
      });

      handicapSeatDomArray.forEach((dom) => {
        if (mussSeatSelectedCount > 0) {
          makeDisabled(dom);
        } else if (mussSeatSelectedCount === 0) {
          removeDisabled(dom);
        }
      });
    }

    if (mussSeatSelectedCount > 0) {
      handicapDom.disabled = true;
    } else if (mussSeatSelectedCount === 0) {
      handicapDom.disabled = false;
    }
  });
});

handicapSeatDomArray.forEach((dom) => {
  dom.addEventListener("click", function (event) {
    const className = event.target.className;
    if (className.includes("disabled")) return;

    if (!handicapDom.checked) {
      window.alert(
        "선택하신 좌석은 장애인석으로 일반고객은 예매할 수 없는 좌석입니다."
      );
      return;
    }

    const checked = className.includes("clicked");

    if (!checked) {
      makeClicked(event.target);
      handicapSeatSelectedCount++;
      seatSelectedCount++;
    } else {
      removeClicked(event.target);
      handicapSeatSelectedCount--;
      seatSelectedCount--;
    }

    if (seatSelectedCount === totalCount) {
      seatDomArray.forEach((dom) => {
        if (!dom.className.includes("clicked")) {
          makeDisabled(dom);
        }
      });
    } else {
      handicapSeatDomArray.forEach((dom) => {
        removeDisabled(dom);
      });

      normalDomArray.forEach((dom) => {
        if (handicapSeatSelectedCount > 0) {
          makeDisabled(dom);
        } else if (handicapSeatSelectedCount === 0) {
          removeDisabled(dom);
        }
      });

      mussDomArray.forEach((dom) => {
        if (handicapSeatSelectedCount > 0) {
          makeDisabled(dom);
        } else if (handicapSeatSelectedCount === 0) {
          removeDisabled(dom);
        }
      });
    }
  });
});

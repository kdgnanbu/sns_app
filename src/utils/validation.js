export function validateRegister({ userName, userMail, userPass }) {
  let errorMsg = "";

  if (!userName) {
    errorMsg += "※名前を入力してください\n";
  }
    if (!userMail) {
    errorMsg += "※メールアドレスを入力してください\n";
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(userMail)) {
    errorMsg += "※正しいメールアドレスを入力してください\n";
  }
      if (!userPass) {
    errorMsg += "※パスワードを入力してください\n";
  }else   if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPass)) {
    errorMsg += "※パスワードは半角英数字で8文字以上必要です\n";
  }
  return errorMsg;
}

export function validateLogin({ userMail, userPass }) {
  let errorMsg = "";

    if (!userMail) {
    errorMsg += "※メールアドレスを入力してください\n";
  }else   if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(userMail)) {
    errorMsg += "※正しいメールアドレスを入力してください\n";
  }
      if (!userPass) {
    errorMsg += "※パスワードを入力してください\n";
  }else   if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPass)) {
    errorMsg += "※パスワードは半角英数字で8文字以上必要です\n";
  }
  return errorMsg;
}

import Link from "next/link";

const Login = () => {
  return (
    <div className="wrapper">
      <form>
        <div>
          <label htmlFor="login_id">ID</label>
          <input id="login_id" type={"text"} />
        </div>
        <div>
          <label htmlFor="login_pw">PASSWORD</label>
          <input id="login_pw" type={"password"} />
        </div>
        <div>
          <label htmlFor="login_email">EMAIL</label>
          <input id="login_email" type={"email"} />
        </div>
        <div>
          <input
            id="login_submit"
            type={"submit"}
            value="submit"
            onClick={(e) => {
              e.preventDefault();
              console.log(e.currentTarget);
            }}
          />
        </div>
      </form>
      <div className="oauth_provider">
        <Link href={"http://localhost:8080/oauth2/authorization/google"}>
          <span>구글 로그인</span>
        </Link>
        <Link href={"http://localhost:8080/oauth2/authorization/facebook"}>
          <span>페이스북 로그인</span>
        </Link>
        <Link href={"http://localhost:8080/oauth2/authorization/naver"}>
          <span>네이버 로그인</span>
        </Link>
      </div>
      <style jsx>{`
        .wrapper {
          width: 80%;
          margin: 0 auto;
        }
        .oauth_provider {
          display: flex;
        }
        #login_submit {
          width: 21em;
        }
        form {
          display: block;
        }
        form div {
          width: 100%;
          display: flex;
          justify-contents: space-between;
          margin-bottom: 1em;
        }
        form label {
          width: 5.5em;
        }
      `}</style>
    </div>
  );
};

export default Login;

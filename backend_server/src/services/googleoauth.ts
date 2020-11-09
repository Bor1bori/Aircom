import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_URL
);

/*
{
  access_token: 'ya29.a0AfH6SMB5ozSQgNC2wq1aw1BGrFsHRspCsqPOOA_uc8q3ZC5swrBxmDefojLNCR6EgMGM5PrgvUb9-7u4mKzkNYfohuwjUhqe1dj7UJ-0s_qwJ450D9p4KXfx-Vle7q-1Hxl54r5pQVv0RbAaF77MmsFQE0RJWPEuV9M',
  scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
  token_type: 'Bearer',
  id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2M2VlMGJlMDkzZDliYzMxMmQ5NThjOTk2NmQyMWYwYzhmNmJiYmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NjcwMjc5OTg0MjktbjUwaWlqZjdnZm9lN2lsZG52dnZwbGdlNHU5b3ZkajMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NjcwMjc5OTg0MjktbjUwaWlqZjdnZm9lN2lsZG52dnZwbGdlNHU5b3ZkajMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDAxNzI0NDMwNTc2MDg4Mzc4MjciLCJlbWFpbCI6InZpbmV5YXJkLnNvbWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJqaDRDSnc0WmpFOHhqM2Yzd3drbFZBIiwibmFtZSI6InZpbmV5YXJkIHNvbWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy03ZGhlc1h6cGUxQS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNrbWp4bENhUFdIckJOeDhaM0g3eEE5NWFoOThRL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJ2aW5leWFyZCIsImZhbWlseV9uYW1lIjoic29tYSIsImxvY2FsZSI6ImtvIiwiaWF0IjoxNTk1OTE1MDgwLCJleHAiOjE1OTU5MTg2ODB9.pa-jCnEe5TvKDqNfLLQ08bLIdIM0eWGZMl3fOogPHV10euCCtJDR6TXQ5zdrrC5RaP4A-77o69BY6WQRMFwEBg3O3fbBkQIpuJWzvxFQ9RHURNKAQKbKtzr39uWf57GogDXqCFSK36itcFHdM_sUCkxAnfiOQGejt0kA1wRv_1nOroADcXg9hIgzNM3OOOLVwMNP9xLCVK727D0Gg5GVAiIVPKU24FLjVKcqWP_q9Y1c0i9zL51EpiZsVKrdLwvN4EpNma1vUhynDvWaAygplCRmwTtf6p9LDdEhhznrK0wdk27gpkoTBEDFQFe2dLfee1xTGp6grPA_q6r--MvqBA',
  expiry_date: 1595918680366
}
*/

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'openid'
];

export const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'online',
  scope: scopes
});

/**
 * @description 구글 OAuth에서 사용자가 동의를 한 후 redirect의 주소로 이동하며
 * token과 바꿀 수 있는 Authorization Code를 query 형태로 전달하게 되는데
 * 이때 그 Code를 token으로 바꿔 id_token을 반환하는 함수
 * @param code 사용자의 동의가 끝나고 redirect될 때 뒤에 query로 ?code={}에 들어가는 값
 * @returns id_token google oauth id token
 */
export const getIdTokenWithAuthorizationCode = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens.id_token;
};

/**
 * @description idToken을 받아 무결성을 검증한 후
 * 해당 사용자 google 계정의 userid를 반환
 * @param idToken id Token
 * @returns userId 해당 사용자 google 계정의 userid
 */
export const getUserIdFromIdToken = async (idToken: string) => {
  let ticket;
  try {
    ticket = await oauth2Client.verifyIdToken({
      idToken,
      audience: [process.env.GOOGLE_OAUTH_APP_CLIENT_ID!, process.env.GOOGLE_OAUTH_CLIENT_ID!]
    });
  } catch (err) {
    throw new Error(err);
  }

  const payload = ticket.getPayload();
  const userId = payload!.sub;

  return userId;
};

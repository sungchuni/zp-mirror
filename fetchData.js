const REQUEST_URL = "https://www.zeropaypoint.or.kr/cstm_0001_01_r001.jct";

export default function fetchData({
  PAGE_NO = "1",
  PAGE_PER_REQ_CNT = "10"
} = {}) {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  const body = s({
    MEST_NM: "",
    MOBI_VOCR_CD: "L2020_00042",
    MRKT_NM: "",
    PAGE_NO,
    PAGE_PER_REQ_CNT,
    ZPCD1_NM: "",
    ZPCD2_NM: ""
  });
  return fetch(REQUEST_URL, {
    method: "POST",
    headers,
    body,
    mode: "cors"
  });
}

function s(input = {}) {
  return `_JSON_=${encodeURIComponent(
    encodeURIComponent(JSON.stringify(input))
  )}`;
}

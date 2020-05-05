import {
  html,
  Component
} from "https://unpkg.com/htm/preact/standalone.module.js";
import result from "./result.js";
/**
 * ADDR
 * BIZ_NO
 * MEST_NM
 * MEST_NO
 * MOBI_VOCR_CD
 * MOBI_VOCR_DV
 * MOBI_VOCR_NM
 * MRKT_NM
 * RPPR_NM
 * TPBS
 * ZPCD
 */
const categories = new Set();
result.forEach(({TPBS}) => categories.add(TPBS));

export default class ResultTable extends Component {
  constructor() {
    super();
    this.state = {address: "", category: "", keyword: ""};
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const {value} = event.target;
    this.setState({category: value});
  }
  handleInput(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  render(_, {address, category, keyword}) {
    const filtered = result.filter(
      ({ADDR, MEST_NM, TPBS}) =>
        (address ? new RegExp(address, "i").test(ADDR) : true) &&
        (category ? category === TPBS : true) &&
        (keyword ? new RegExp(keyword, "i").test(MEST_NM) : true)
    );
    return html`
      <div>
        <style>
          body {
            font-size: 14px;
          }
          table {
            width: 100%;
          }
          table tr:hover td {
            background-color: lightgrey;
          }
          table tr th {
            text-align: left;
          }
          @media (max-width: 640px) {
            table tr {
              display: flex;
              flex-direction: column;
              margin-bottom: 1em;
            }
          }
        </style>
        <div>총 ${filtered.length}개의 결과</div>
        <table>
          <thead>
            <tr>
              <th>
                <span>분류</span>
                <br />
                <select onChange="${this.handleChange}">
                  <option selected>-- 분류 --</option>
                  ${[...categories.entries()]
                    .sort()
                    .map(
                      ([category]) =>
                        html`<option value="${category}">${category}</option>`
                    )}
                </select>
              </th>
              <th>
                <span>상호명</span>
                <br />
                <input
                  type="text"
                  name="keyword"
                  onInput="${this.handleInput}"
                />
              </th>
              <th>
                <span>주소</span>
                <br />
                <input
                  type="text"
                  name="address"
                  onInput="${this.handleInput}"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            ${filtered.slice(0, 2 ** 8).map(
              ({ADDR, MEST_NM, TPBS}) => html`
                <tr>
                  <td>${TPBS}</td>
                  <td>${MEST_NM}</td>
                  <td>
                    <a
                      href="https://map.naver.com/v5/search/${encodeURIComponent(
                        ADDR
                      )}"
                      target="_blank"
                      >${ADDR}</a
                    >
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

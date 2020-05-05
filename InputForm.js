import {
  html,
  Component
} from "https://unpkg.com/htm/preact/standalone.module.js";
import fetchData from "./fetchData.js";

export default class InputForm extends Component {
  constructor() {
    super();
    this.state = {PAGE_NO: "1", PAGE_PER_REQ_CNT: "10"};
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  async handleSubmit(event) {
    event.preventDefault();
    const response = await fetchData(this.state);
    console.log(response);
    console.log(await response.body());
  }
  render() {
    return html`
      <form name="InputForm" onSubmit=${this.handleSubmit}>
        <input
          type="text"
          value="${this.state.PAGE_NO}"
          name="PAGE_NO"
          onInput="${this.handleInput}"
        />
        <br />
        <input
          type="text"
          value="${this.state.PAGE_PER_REQ_CNT}"
          name="PAGE_PER_REQ_CNT"
          onInput="${this.handleInput}"
        />
        <br />
        <input type="submit" value="SEND" />
      </form>
    `;
  }
}

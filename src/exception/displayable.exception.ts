import { HttpException } from "@nestjs/common";

export class DisplayableException extends HttpException {
	public error_message: string;
	public code: number;
	public data: any;

	constructor(
		data: any,
		message: string = "Exception",
		http_code: number = 422
	) {
		super(message, http_code);
		this.error_message = message;
		this.code = http_code;
		this.data = data;
		Object.setPrototypeOf(this, DisplayableException.prototype);
	}

  getResponse(): string | object {
    return {
      status: false,
      status_code: this.getStatus(),
      message: this.error_message,
      data: this.data,
      timestamp: new Date().toISOString()
    }
  }
}

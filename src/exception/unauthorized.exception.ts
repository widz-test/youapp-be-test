import { HttpException } from "@nestjs/common";

export class UnauthorizedException extends HttpException {
	public error_message: string;
	public code: number;
	public data: any;

	constructor(
		data: any = {},
		message: string = "Unauthorized",
		http_code: number = 401
	) {
		super(message, http_code);
		this.error_message = message;
		this.code = http_code;
		this.data = data;
		Object.setPrototypeOf(this, UnauthorizedException.prototype);
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

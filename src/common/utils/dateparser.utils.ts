export class Dateparser {
	static now(date: Date = new Date()): string {
		return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
			-2
		)}-${("0" + date.getDate()).slice(-2)} ${
			("0" + date.getHours()).slice(-2) +
			":" +
			("0" + date.getMinutes()).slice(-2) +
			":" +
			("0" + date.getSeconds()).slice(-2)
		}`;
	}

	static unixToDate(unix: number): Date {
		return new Date(unix * 1000);
	}

	static unixNow() {
		return Math.floor(Date.now() / 1000);
	}

	static dateToUnix(date: string): number {
		return Math.floor(new Date(date).getTime() / 1000);
	}

    static formatDate(date: Date, format: string): string {
        let result = "";
        if(format && date) {
            for(let index = 0; index < format.length; index++) {
                switch (format[index]) {
                    case 'Y':
                        result += `${date.getFullYear()}`;              
                        break;
                    case 'm':
                        result += `${("0"+(date.getMonth()+1)).slice(-2)}`;               
                        break;
                    case 'd':
                        result += `${("0" + date.getDate()).slice(-2)}`;
                        break;
                    case 'H':
                        result += `${("0" + date.getHours()).slice(-2)}`;
                        break;
                    case 'i':
                        result += `${("0" + date.getMinutes()).slice(-2)}`;
                        break;
                    case 's':
                        result += `${("0" + date.getSeconds()).slice(-2)}`;
                        break;
                    case ' ':
                        result += ' ';
                        break;
                    case '-':
                        result += '-';
                        break;
                    case '/':
                        result += '/';
                        break;
                    case ':':
                        result += ':';
                        break;
                    default:
                        break;
                }
                
            }
        }
        return result;
    }
}
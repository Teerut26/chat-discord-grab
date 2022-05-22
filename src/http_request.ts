import axios, { Axios, AxiosStatic } from "axios";
import { promises } from "fs";
import path from "path";
import { Message } from "./interfaces/message";
require("dotenv").config();

export default class HttpRequest {
    private token = process.env.DISCORD_TOKEN;
    private channel_id: string = "";

    constructor(channel_id: string) {
        this.channel_id = channel_id;
    }

    public async getInit(): Promise<Message[]> {
        let { data } = await axios({
            method: "get",
            url: `https://discord.com/api/v9/channels/${this.channel_id}/messages?limit=50`,
            headers: {
                authorization: this.token as string,
            },
        });

        return data;
    }

    public async getMore(before_id_message: string): Promise<Message[]> {
        let { data } = await axios({
            method: "get",
            url: `https://discord.com/api/v9/channels/${this.channel_id}/messages?before=${before_id_message}&limit=100`,
            headers: {
                authorization: this.token as string,
            },
        });
        return data
    }

    public async saveFile(data: Message[]) {
        const old_data_raw = await promises.readFile(path.join(__dirname, "data.json"))
        const old_data_json:Message[] = JSON.parse(old_data_raw.toString())

        old_data_json.push(...data)

        await promises.writeFile(
            path.join(__dirname, "data.json"),
            JSON.stringify(old_data_json)
        );
    }
}

#!/usr/bin/env node

import { fetchFirst20EvenTodo } from "./service/todoService";
import { Command } from "commander";

export const program = new Command();

program.name("fetch_todo").description("fetch first 20 even todo");

program.action(() => {
  fetchFirst20EvenTodo().then(console.log).catch(console.error);
});

program.parse();

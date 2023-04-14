// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  window,
  commands,
  ExtensionContext,
  env,
  Uri,
  languages,
  Hover,
  MarkdownString,
} from "vscode";
import { openAiIsActive } from "./openAi";
import { getApiKey } from "./apiKey";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gptutor-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = commands.registerCommand('gptutor-extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		window.showInformationMessage('Hello World from gptutor-extension!');
	});

	context.subscriptions.push(disposable);


	// Initialize GPTutor
	// - Set OpenAI API key
	context.subscriptions.push(
    commands.registerCommand("Initialize GPTutor", async () => {
      let OPEN_AI_API_KEY: any = context.globalState.get("OpenAI_API_KEY");
      if (await openAiIsActive(OPEN_AI_API_KEY)) {
        window.showInformationMessage(`GPTutor Activate Successfully!`);
      } else {
        await getApiKey(context);
      }
    })
  );

	// TODO: configure GPTutor

	// TODO: get code from editor
	// - Get code from editor
	// - Get cursor position
	// - determine if cursor is selected Text or Hovering over some code

	// TODO: get context from code

	// TODO: send code to GPTutor API
	// TODO: handle response from GPTutor API

	// TODO: display response from GPTutor API
	// - How to display response from GPTutor API??
}

// This method is called when your extension is deactivated
export function deactivate() {}

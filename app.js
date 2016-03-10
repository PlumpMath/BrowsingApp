'use strict';

const electron = require('electron');
const app = electron.app;  // アプリケーション作成用モジュール
const BrowserWindow = electron.BrowserWindow;  // メインウィンドウ作成用モジュール

//  クラッシュレポート
require('crash-reporter').start();

var mainWindow = null;

// 全てのウィンドウが閉じたら、アプリケーションを終了する
app.on('window-all-closed', () => {
	app.quit();
});

// アプリケーション初期化完了後
app.on('ready', () => {
	// メインウィンドウ
	mainWindow = new BrowserWindow({ width: 600, height: 622, x: 0, y: 0});

	// 読み込み
	mainWindow.loadURL('file://' + __dirname + '/main.html');
	
	// デバッグ
	// mainWindow.webContents.openDevTools();
	// メインウィンドウを閉じた時
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});
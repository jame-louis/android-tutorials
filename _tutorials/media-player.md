---
layout: tutorial
title: "媒体播放器"
tutorial_name: media-player
difficulty: Beginner
duration: 45 mins
creator: jame louis
date: 2025-10-17
---

## 准备工作

在此教程中，您将学习如何在Android应用中创建和使用MediaPlayer。

### 前提条件

- 已安装 Android Studio 4.1.1
- 具备 Java 的基础理解
- 完成[您的第一个Android应用]({{ '/tutorials/your-first-application' | relative_url }})
- 完成[进度条]({{ '/tutorials/progress-bar' | relative_url }})
- 30–60 分钟的空闲时间

### 学习内容

- 如何创建和配置媒体播放器
- 如何播放和暂停媒体
- 如何设置媒体的进度

## 创建项目

- 项目名称：MediaPlayer
- 包名：com.example.mediaplayer
- 如遇到问题，请参考[您的第一个Android应用]({{ '/tutorials/your-first-application' | relative_url }})。

## MediaPlayer 类

MediaPlayer 类是 Android 提供的用于播放媒体文件的类。它可以播放音频和视频文件，并且支持多种格式。

### MediaPlayer 基础知识

| 概念 | 说明 |
|---|---|
| **MediaPlayer** | Android 提供的多媒体播放引擎，支持本地/raw/网络音频、视频。 |
| **状态机** | 官方文档中的状态图是核心：Idle → Initialized → Prepared → Started → … → End。只有进入 **Prepared** 状态后才能 `start()`。 |
| **同步/异步** | `create()` 是同步接口，内部已调用 `prepare()`；若用 `new MediaPlayer()` 需手动 `setDataSource → prepareAsync()`。 |
| **生命周期** | 必须在不用时**立即** `release()`，否则既占用内存又可能引发“IllegalStateException”。 |
| **线程限制** | 创建、访问、释放必须在**同一线程**（通常主线程）；`getCurrentPosition()` 可在任何线程，但更新 UI 要切回主线程。 |

---

### 核心 API 速查表

| 方法 | 典型用途 |
|---|---|
| `MediaPlayer.create(ctx, resId)` | 快速加载 raw 资源并返回已 prepare 的对象 |
| `start()` / `pause()` / `stop()` | 播放控制 |
| `isPlaying()` | 判断当前是否正在播放 |
| `getDuration()` | 总时长（ms），Prepared 后可用 |
| `getCurrentPosition()` | 当前播放头位置（ms） |
| `setOnCompletionListener()` | 监听播放完毕 |
| `setOnPreparedListener()` | 监听准备完成（配合异步 prepare） |
| `release()` | 释放 native 资源，之后对象不可再用 |

## Demo

基于 `MediaPlayer + ProgressBar` 实现“播放/暂停/停止 + 实时进度”最小可运行范例

### 界面设计

- 添加LinearLayout 用于包含播放/暂停/停止按钮
    - 添加3个Button 分别对应播放/暂停/停止
    - 绑定 onClick 事件
- 添加ProgressBar (Horizontal) 用于显示实时进度
    - max: 100
    - progress: 0

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <LinearLayout
        android:id="@+id/linearLayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent">

        <Button
            android:id="@+id/button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:onClick="onClickPlay"
            android:text="播放" />

        <Button
            android:id="@+id/button2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:onClick="onClickPause"
            android:text="暂停" />

        <Button
            android:id="@+id/button3"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:onClick="onClickStop"
            android:text="停止" />

    </LinearLayout>

    <ProgressBar
        android:id="@+id/progressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:layout_weight="1"
        android:max="100"
        app:layout_constraintBottom_toTopOf="@+id/linearLayout"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### 音频文件

- [FreePD](https://freepd.com/) 提供免费的音频文件下载
- 选择一个音频文件，点击下载
- 将下载的音频文件放入 `app/src/main/res/raw` 目录下
    - 如果目录raw不存在，右键点击res目录，选择New → Directory，输入raw

![raw目录]({{ "/assets/images/res-raw-folder.png" | relative_url }})

### 代码实现

#### 初始化 MediaPlayer

```java
void initMedia() {
    mediaPlayer = MediaPlayer.create(MainActivity.this, R.raw.lukewarm_banjo);
    mediaPlayer.setOnPreparedListener(mp -> {
        // 把进度条最大值设为音频总时长（毫秒）
        progressBar.setMax(mp.getDuration());
    });
    mediaPlayer.setOnCompletionListener(mp -> stopProgressUpdate());
}
```

#### 播放/暂停/停止 按钮事件处理

```java
public void onClickPlay(View v) {
        if(mediaPlayer != null && !mediaPlayer.isPlaying()) {
            mediaPlayer.start();
            startProgressUpdate();
        }
    }

    public void onClickStop(View v) {
        if(mediaPlayer!=null) {
            mediaPlayer.stop();
            progressBar.setProgress(0);
            stopProgressUpdate();
        }
    }

    public void onClickPause(View v){
        if(mediaPlayer!=null) {
            mediaPlayer.pause();
            stopProgressUpdate();
        }
    }
```

#### 实时进度更新

```java
 /* 开始刷新进度 */
    private void startProgressUpdate() {
        progressUpdater = new Runnable() {
            @Override
            public void run() {
                Log.i("media-player", "update progress : " + progressBar.getProgress());
                if (mediaPlayer != null && mediaPlayer.isPlaying()) {
                    int pos = mediaPlayer.getCurrentPosition();
                    progressBar.setProgress(pos);
                    progressHandler.postDelayed(this, 300); // 300 ms 刷新一次
                }
            }
        };
        progressHandler.post(progressUpdater);
    }

    /* 停止刷新进度 */
    private void stopProgressUpdate() {
        if (progressUpdater != null) {
            Log.i("media-player", "stopProgressUpdate: ");
            progressHandler.removeCallbacks(progressUpdater);
            progressUpdater = null;
        }
    }
```

#### MainActivity 完整代码

```java
package com.example.mediaplayer;

import androidx.appcompat.app.AppCompatActivity;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.widget.ProgressBar;

public class MainActivity extends AppCompatActivity {

    private MediaPlayer mediaPlayer;
    private ProgressBar progressBar;
    private Handler progressHandler = new Handler(Looper.getMainLooper());
    private Runnable progressUpdater;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        progressBar = findViewById(R.id.progressBar);
        initMedia();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        stopProgressUpdate();
        destoryMedia();
    }

    public void onClickPlay(View v) {
        if(mediaPlayer != null && !mediaPlayer.isPlaying()) {
            mediaPlayer.start();
            startProgressUpdate();
        }
    }

    public void onClickStop(View v) {
        if(mediaPlayer!=null) {
            mediaPlayer.stop();
            progressBar.setProgress(0);
            stopProgressUpdate();
        }
    }

    public void onClickPause(View v){
        if(mediaPlayer!=null) {
            mediaPlayer.pause();
            stopProgressUpdate();
        }
    }

    void initMedia() {
        mediaPlayer = MediaPlayer.create(MainActivity.this, R.raw.lukewarm_banjo);
        mediaPlayer.setOnPreparedListener(mp -> {
            // 把进度条最大值设为音频总时长（毫秒）
            progressBar.setMax(mp.getDuration());
        });
        mediaPlayer.setOnCompletionListener(mp -> stopProgressUpdate());
    }

    void destoryMedia() {
        if(mediaPlayer!=null) {
            mediaPlayer.stop();
            mediaPlayer.release();
        }
    }

    /* 开始刷新进度 */
    private void startProgressUpdate() {
        progressUpdater = new Runnable() {
            @Override
            public void run() {
                Log.i("media-player", "update progress : " + progressBar.getProgress());
                if (mediaPlayer != null && mediaPlayer.isPlaying()) {
                    int pos = mediaPlayer.getCurrentPosition();
                    progressBar.setProgress(pos);
                    progressHandler.postDelayed(this, 300); // 300 ms 刷新一次
                }
            }
        };
        progressHandler.post(progressUpdater);
    }

    /* 停止刷新进度 */
    private void stopProgressUpdate() {
        if (progressUpdater != null) {
            Log.i("media-player", "stopProgressUpdate: ");
            progressHandler.removeCallbacks(progressUpdater);
            progressUpdater = null;
        }
    }

}
```

#### 运行应用

![音频播放器]({{ "/assets/images/run-app-media-player.png" | relative_url }})

## 总结

- 初始化 MediaPlayer 时，需要调用 `MediaPlayer.create()` 方法，传入上下文和音频资源 ID。
- 播放/暂停/停止 按钮事件处理时，需要判断 MediaPlayer 是否为 null，以及是否正在播放。
- 实时进度更新时，需要使用 Handler 来刷新进度条，避免阻塞主线程。
- 销毁 MediaPlayer 时，需要调用 `release()` 方法释放资源。
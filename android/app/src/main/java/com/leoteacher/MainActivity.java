package com.leoteacher;

import com.facebook.react.ReactActivity;

import android.content.Intent;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "LEOTeacher";
  }
  // @Override
  // protected void onCreate(Bundle savedInstanceState) {
  //     super.onCreate(savedInstanceState);

  //    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
  //       NotificationChannel notificationChannel = new NotificationChannel("notificationchannel", "notificationchannel", NotificationManager.IMPORTANCE_HIGH);
  //       notificationChannel.setShowBadge(true);
  //       notificationChannel.setDescription("");
  //       AudioAttributes att = new AudioAttributes.Builder()
  //               .setUsage(AudioAttributes.USAGE_NOTIFICATION)
  //               .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
  //               .build();
  // notificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/my_custom_sound"), att);
  //  // notificationChannel.setSound(Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.uber), att);
       
  //       notificationChannel.enableVibration(true);
  //       notificationChannel.setVibrationPattern(new long[]{400, 400});
  //    //   notificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
  //       NotificationManager manager = getSystemService(NotificationManager.class);
  //       manager.createNotificationChannel(notificationChannel);


  //   }
  // }

  
	@Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
 super.onActivityResult(requestCode, resultCode, data);
 MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
 }
}

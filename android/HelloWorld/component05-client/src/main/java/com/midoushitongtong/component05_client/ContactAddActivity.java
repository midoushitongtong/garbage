package com.midoushitongtong.component05_client;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.ContentProviderOperation;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.OperationApplicationException;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.RemoteException;
import android.provider.ContactsContract;
import android.util.Log;
import android.widget.EditText;

import com.midoushitongtong.component05_client.entity.Contact;
import com.midoushitongtong.component05_client.util.PermissionUtil;
import com.midoushitongtong.component05_client.util.ToastUtil;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class ContactAddActivity extends AppCompatActivity {
    private void addContact(ContentResolver contentResolver, Contact contact) {
        // 1. 往 raw_contacts 表添加记录
        ContentValues rawContractsValues = new ContentValues();
        Uri uri = contentResolver.insert(ContactsContract.RawContacts.CONTENT_URI, rawContractsValues);
        long rawContactId = ContentUris.parseId(uri);

        // 2. 往 data 表添加姓名记录
        ContentValues nameDataValues = new ContentValues();
        // 关联联系人编号
        nameDataValues.put(ContactsContract.Contacts.Data.RAW_CONTACT_ID, rawContactId);
        // 数据类型为 "姓名"
        nameDataValues.put(ContactsContract.Contacts.Data.MIMETYPE, ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE);
        // 设置姓名数据
        nameDataValues.put(ContactsContract.Contacts.Data.DATA2, contact.name);
        // 插入联系人数据
        contentResolver.insert(ContactsContract.Data.CONTENT_URI, nameDataValues);

        // 3. 往 data 表添加手机号记录
        ContentValues phoneDataValues = new ContentValues();
        // 关联联系人编号
        phoneDataValues.put(ContactsContract.Contacts.Data.RAW_CONTACT_ID, rawContactId);
        // 数据类型为 "手机号"
        phoneDataValues.put(ContactsContract.Contacts.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE);
        // 设置手机号数据
        phoneDataValues.put(ContactsContract.Contacts.Data.DATA1, contact.phoneNumber);
        // 设置联系类型数据, "1"表示家庭, "2"表示手机号
        phoneDataValues.put(ContactsContract.Contacts.Data.DATA2, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE);
        // 插入联系人数据
        contentResolver.insert(ContactsContract.Data.CONTENT_URI, phoneDataValues);

        // 3. 往 data 表添加手机号记录
        ContentValues emailDataValues = new ContentValues();
        // 关联联系人编号
        emailDataValues.put(ContactsContract.Contacts.Data.RAW_CONTACT_ID, rawContactId);
        // 数据类型为 "手机号"
        emailDataValues.put(ContactsContract.Contacts.Data.MIMETYPE, ContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE);
        // 设置手机号数据
        emailDataValues.put(ContactsContract.Contacts.Data.DATA1, contact.email);
        // 设置联系类型数据, "1"表示家庭, "2"表示工作
        emailDataValues.put(ContactsContract.Contacts.Data.DATA2, ContactsContract.CommonDataKinds.Email.TYPE_WORK);
        // 插入联系人数据
        contentResolver.insert(ContactsContract.Data.CONTENT_URI, emailDataValues);

        ToastUtil.show(this, "添加成功");
    }

    private void addFullContact(ContentResolver contentResolver, Contact contact) {
        // 创建一个插入联系人主记录的内容操作器
        ContentProviderOperation mainOperation = ContentProviderOperation
                .newInsert(ContactsContract.RawContacts.CONTENT_URI)
                .withValue(ContactsContract.RawContacts.ACCOUNT_NAME, null)
                .build();
        // 创建一个插入联系人姓名记录的内容操作器
        ContentProviderOperation nameOperation = ContentProviderOperation
                .newInsert(ContactsContract.Data.CONTENT_URI)
                // 设置主记录的 id
                .withValueBackReference(ContactsContract.Contacts.Data.RAW_CONTACT_ID, 0)
                .withValue(ContactsContract.Contacts.Data.MIMETYPE, ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE)
                .withValue(ContactsContract.Contacts.Data.DATA2, contact.name)
                .build();
        // 创建一个插入联系人手机号记录的内容操作器
        ContentProviderOperation phoneOperation = ContentProviderOperation
                .newInsert(ContactsContract.Data.CONTENT_URI)
                // 设置主记录的 id
                .withValueBackReference(ContactsContract.Contacts.Data.RAW_CONTACT_ID, 0)
                .withValue(ContactsContract.Contacts.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE)
                .withValue(ContactsContract.Contacts.Data.DATA1, contact.phoneNumber)
                .withValue(ContactsContract.Contacts.Data.DATA2, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE)
                .build();
        // 创建一个插入联系人电子邮箱记录的内容操作器
        ContentProviderOperation emailOperation = ContentProviderOperation
                .newInsert(ContactsContract.Data.CONTENT_URI)
                // 设置主记录的 id
                .withValueBackReference(ContactsContract.Contacts.Data.RAW_CONTACT_ID, 0)
                .withValue(ContactsContract.Contacts.Data.MIMETYPE, ContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE)
                .withValue(ContactsContract.Contacts.Data.DATA1, contact.email)
                .withValue(ContactsContract.Contacts.Data.DATA2, ContactsContract.CommonDataKinds.Email.TYPE_MOBILE)
                .build();

        ArrayList<ContentProviderOperation> operationList = new ArrayList<>();
        operationList.add(mainOperation);
        operationList.add(nameOperation);
        operationList.add(phoneOperation);
        operationList.add(emailOperation);
        try {
            // 批量提交四个操作, 要么都成功, 要么都失败
            contentResolver.applyBatch(ContactsContract.AUTHORITY, operationList);
        } catch (OperationApplicationException e) {
            throw new RuntimeException(e);
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        }
    }

    @SuppressLint("Range")
    private void readContact(ContentResolver contentResolver) {
        ArrayList<Contact> list = new ArrayList<>();
        // 先查询 raw contacts 表
        Cursor cursor = contentResolver.query(
                ContactsContract.RawContacts.CONTENT_URI,
                new String[]{ContactsContract.RawContacts._ID},
                null,
                null,
                null,
                null
        );
        // 在根据 raw contacts id 去查 data 表
        while (cursor.moveToNext()) {
            Contact contact = new Contact();
            int rawContactId = cursor.getInt(0);

            Cursor dataCursor = contentResolver.query(
                    ContactsContract.Data.CONTENT_URI,
                    new String[]{ContactsContract.Data.MIMETYPE, ContactsContract.Data.DATA1, ContactsContract.Data.DATA2},
                    ContactsContract.Data.RAW_CONTACT_ID + "=?",
                    new String[]{String.valueOf(rawContactId)},
                    null
            );

            while (dataCursor.moveToNext()) {
                String data1 = dataCursor.getString(dataCursor.getColumnIndex(ContactsContract.Data.DATA1));
                String mimeType = dataCursor.getString(dataCursor.getColumnIndex(ContactsContract.Data.MIMETYPE));
                switch (mimeType) {
                    // 是姓名
                    case ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE:
                        contact.name = data1;
                        break;
                    // 邮箱
                    case ContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE:
                        contact.email = data1;
                        break;
                    // 手机
                    case ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE:
                        contact.phoneNumber = data1;
                        break;
                }
            }

            dataCursor.close();

            if (contact.name != null) {
                list.add(contact);
            }
        }

        cursor.close();

        for (Contact c : list) {
            Log.d("ning", c.toString());
        }
    }

    private void init() {
        EditText nameEditText = findViewById(R.id.name_edit_text);
        EditText phoneNumberEditText = findViewById(R.id.phone_number_edit_text);
        EditText emailEditText = findViewById(R.id.email_edit_text);

        findViewById(R.id.save_button).setOnClickListener(view -> {
            boolean hasPermission = PermissionUtil.checkPermission(this, PermissionUtil.PERMISSIONS_CONTACT, PermissionUtil.REQUEST_CODE_CONTACT);

            // 用户没有权限
            if (!hasPermission) {
                return;
            }

            String name = nameEditText.getText().toString();
            String phoneNumber = phoneNumberEditText.getText().toString();
            String email = emailEditText.getText().toString();

            // 创建联系人对象
            Contact contact = new Contact();
            contact.name = name;
            contact.phoneNumber = phoneNumber;
            contact.email = email;

//            addContact(getContentResolver(), contact);
            addFullContact(getContentResolver(), contact);
        });

        findViewById(R.id.read_button).setOnClickListener(view -> {
            boolean hasPermission = PermissionUtil.checkPermission(this, PermissionUtil.PERMISSIONS_CONTACT, PermissionUtil.REQUEST_CODE_CONTACT);

            // 用户没有权限
            if (!hasPermission) {
                return;
            }

            readContact(getContentResolver());
        });
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_add);

        init();
    }
}
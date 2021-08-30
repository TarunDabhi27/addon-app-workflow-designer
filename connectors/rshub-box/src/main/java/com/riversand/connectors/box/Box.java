package com.riversand.connectors.box;

public final class Box {
   public static final String GRANT_TYPE_VALUE = "urn:ietf:params:oauth:grant-type:jwt-bearer";
   public static final String PUBLIC_KEY_ID = "publicKeyID";
   public static final String PRIVATE_KEY = "privateKey";
   public static final String PASSPHRASE_KEY = "passphrase";
   public static final String ENTERPRISE_ID = "enterpriseID";
   public static final String FILES = "files";
   public static final String CONTENT = "content";
   public static final String PARENT_FOLDER = "parentFolder";
   public static final String MAX_FILE_SIZE = "maxFileSize";
   public static final String CLAIM_NAME = "box_sub_type";
   public static final String CLAIM_VALUE = "enterprise";
   public static final float JWT_EXPIRATION = 0.75f;
   public static final String JWT_TYP_HEADER = "typ";
   public static final String JWT_VALUE = "JWT";
   public static final String KEY_ID_HEADER = "kid";
   public static final String ENTRIES = "entries";
   public static final String ITEM_STATUS = "item_status";
   public static final String FILE_UPLOADED = "FILE.UPLOADED";
   public static final String TRIGGER = "trigger";
   public static final String SPLIT = "#@#";
   public static final String PARENT = "parent";
   public static final String FILE_TYPE_EXTENSION = "filetypeextension";
   public static final String FILE = "file";

   private Box() {
      throw new IllegalStateException("Box should be used as a utility class");
   }
}

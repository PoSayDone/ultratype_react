namespace backend.Setting
{
    public class MongoDbSetting
    {
        public string Host { get; set; }

        public int Port { get; set; }

        public string ConnectionString
        {
            get
            {
                return $"mongodb://{Host}:{Port}";
            }
        }
    }
}
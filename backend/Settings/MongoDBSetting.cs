namespace backend.Setting
{
    public class MongoDbSetting
    {
        // public string User { get; set; }
        // public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }

        public string ConnectionString
        {
            get
            {
                return $"mongodb://{Host}:{Port}/";
            }
        }
    }
}

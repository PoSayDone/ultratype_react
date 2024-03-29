﻿using backend.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Repositories;

public class MongoDBRussianWordsRepository : IRussianWordsRepository
{
    private const string databaseName = "catalog";
    private const string collectionName = "russianWords";
    private readonly IMongoCollection<BsonDocument> wordsCollection;

    public MongoDBRussianWordsRepository(IMongoClient mongoClient)
    {
        IMongoDatabase database = mongoClient.GetDatabase(databaseName);
        wordsCollection = database.GetCollection<BsonDocument>(collectionName);
    }

    public async Task<Words> GetWordsAsync(string mask, char mainChar, int len)
    {
        var filter = Builders<BsonDocument>.Filter.And(
            Builders<BsonDocument>.Filter.Regex("word", new BsonRegularExpression("^["+mask+"]+$")),
            Builders<BsonDocument>.Filter.Regex("word", new BsonRegularExpression(".*"+mainChar+".*"))
        );
        var words = await wordsCollection.Find(filter).ToListAsync();
        Console.WriteLine(words.Count);
        var wordList = words.Select(doc => doc["word"].AsString).ToList();
        Console.WriteLine(wordList.Count);
        var randomWordList = new List<string>();
        for (int i = 0; i < len; i++)
        {
            Random rnd = new Random();
            randomWordList.Add(wordList[rnd.Next(0,wordList.Count)]);
        }
        return new Words()
        {
            Strings = randomWordList
        };
    }

    public async Task<Words> GetRandomWords(int len)
    {
        var words = await wordsCollection.Find(new BsonDocument()).ToListAsync();
        var randomList = words.Select(doc => doc["word"].AsString).ToList();
        var wordList = new List<string>();
        for (int i = 0; i < len; i++)
        {
            Random rnd = new Random();
            wordList.Add(randomList[rnd.Next(0,words.Count-1)]);
        }

        return new Words()
        {
            Strings = wordList
        };
    }
}

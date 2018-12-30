using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TrakceAngular.Models;

namespace TrakceAngular.Services
{
    public class TractionService : ITractionService
    {
        public List<Questions> GetTractions()
        {
            List<Questions> questions = new List<Questions>();
            using (StreamReader sr = new StreamReader(@"testUnicode.txt"))
            {
                string s;
                while ((s = sr.ReadLine()) != null)
                {
                    if (string.IsNullOrEmpty(s)) continue;

                    if (char.IsDigit(s[0]))
                    {
                        int questionId = 0;
                        string number = Regex.Split(s, @"\D+").FirstOrDefault();
                        if (!string.IsNullOrEmpty(number))
                        {
                            questionId = int.Parse(number);
                        }

                        Questions question = new Questions { QuestionId = questionId, Question = s };
                        questions.Add(question);
                    }
                    else
                    {
                        Answers answer = new Answers();
                        switch (s[0])
                        {
                            case 'a':
                                answer.AnswerId = 1;
                                answer.Answer = s;
                                break;
                            case 'b':
                                answer.AnswerId = 2;
                                answer.Answer = s;
                                break;
                            case 'c':
                                answer.AnswerId = 3;
                                answer.Answer = s;
                                break;
                        }
                        var question = questions.LastOrDefault();
                        question.Answers.Add(answer);
                    }
                }
            }

            using (StreamReader sr = new StreamReader(@"answerTxt.txt"))
            {
                string s;
                while ((s = sr.ReadLine()) != null)
                {
                    int question = 0;
                    string number = Regex.Split(s, @"\D+").FirstOrDefault();
                    if (!string.IsNullOrEmpty(number))
                    {
                        question = int.Parse(number);
                    }
                    var quest = questions.FirstOrDefault(q => q.QuestionId == question);
                    int length = s.Length;
                    if (!quest.Answers.Any()) continue;

                    switch (char.ToLower(s[length - 1]))
                    {
                        case 'a':
                            quest.Answers.FirstOrDefault(a => a.AnswerId == 1).IsCorrect = true;
                            break;
                        case 'b':
                            quest.Answers.FirstOrDefault(a => a.AnswerId == 2).IsCorrect = true;
                            break;
                        case 'c':
                            quest.Answers.FirstOrDefault(a => a.AnswerId == 3).IsCorrect = true;
                            break;
                    }
                }
            }

            return questions;
        }
    }
}

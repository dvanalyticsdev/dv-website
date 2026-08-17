export interface GoogleReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  details?: string;
  avatarBg: string;
  isLocalGuide?: boolean;
}

export const GOOGLE_REVIEWS_LINK = "https://share.google/jiUpZ0Wu64NNgiM1u";

const avatarColors = [
  '#ef5323', '#2563eb', '#059669', '#7c3aed', '#db2777', 
  '#d97706', '#0891b2', '#4f46e5', '#ca8a04', '#0d9488'
];

const getAvatarColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarColors.length;
  return avatarColors[index];
};

export const googleReviewsData: GoogleReview[] = [
  {
    id: "rev-1",
    name: "Vivek Singh",
    rating: 5,
    date: "a month ago",
    details: "8 reviews · 1 photo",
    avatarBg: getAvatarColor("Vivek Singh"),
    text: "I had a great learning experience with DV Analytics. The training was well-structured and focused on practical skills in SQL, Python, Power BI, and data analytics. The mentors explained concepts clearly and provided hands-on projects that helped build real confidence."
  },
  {
    id: "rev-2",
    name: "Brahma Biswal",
    rating: 5,
    date: "Edited a month ago",
    details: "1 review",
    avatarBg: getAvatarColor("Brahma Biswal"),
    text: "Excellent Learning Experience at DV Analytics !\n\nI recently completed my course at DV Analytics, and I am extremely satisfied with the overall experience. The curriculum is well-structured, up-to-date, and covers all essential data analytics tools and concepts thoroughly."
  },
  {
    id: "rev-3",
    name: "Piyush sah",
    rating: 5,
    date: "2 months ago",
    details: "1 review",
    avatarBg: getAvatarColor("Piyush sah"),
    text: "I had an amazing experience at DV Analytics! They gave me solid training in Data Science, Gen AI, Agentic AI, Machine Learning etc. Plus I got hands-on work with Python, SQL, SAS, Excel, Power BI, Tableau, and more. The trainers are great."
  },
  {
    id: "rev-4",
    name: "Ujwal Deep",
    rating: 5,
    date: "6 months ago",
    details: "1 review · 1 photo",
    avatarBg: getAvatarColor("Ujwal Deep"),
    text: "Course Quality: Very Good\nTrainers: Supportive and experienced\nLearning: Hands-on Data Science and GenAI projects with real-world applications."
  },
  {
    id: "rev-5",
    name: "Prajakta",
    rating: 5,
    date: "6 months ago",
    details: "1 review",
    avatarBg: getAvatarColor("Prajakta"),
    text: "I'm currently a student at DV Analytics and I'm very happy with my learning experience here. The classes are well-structured, and the faculty members demonstrate strong expertise in the applications they teach. They not only explain concepts clearly but also guide us through practical implementation."
  },
  {
    id: "rev-6",
    name: "Ashman Kumar Panda",
    rating: 5,
    date: "4 months ago",
    details: "4 reviews · 1 photo",
    avatarBg: getAvatarColor("Ashman Kumar Panda"),
    text: "DV Analytics offers top-notch training in Data Science, Gen AI, Agentic AI, Data Analytics, and beyond. They cover all the key tools you need, like Python, SQL, SAS, Excel, Power BI, and Tableau, so you walk away with skills that employers actively look for."
  },
  {
    id: "rev-7",
    name: "Thrisha Raj",
    rating: 5,
    date: "4 months ago",
    details: "1 review",
    avatarBg: getAvatarColor("Thrisha Raj"),
    text: "DV Analytics has been an amazing learning experience for me! The Gen AI & Agentic AI program is very well-structured and industry-focused. Trainers explain concepts in a very practical way, and the hands-on projects really helped me gain industry-ready skills."
  },
  {
    id: "rev-8",
    name: "Anusha M",
    rating: 5,
    date: "6 months ago",
    details: "11 reviews · 15 photos",
    avatarBg: getAvatarColor("Anusha M"),
    text: "I'm currently into AI/ML training at DV Analytics. If you are genuinely looking to build a strong and future-proof career in Data Science, Gen AI, or Agentic AI, this institute offers exactly what the industry demands."
  },
  {
    id: "rev-9",
    name: "Vamsi",
    rating: 5,
    date: "6 months ago",
    details: "12 reviews · 1 photo",
    avatarBg: getAvatarColor("Vamsi"),
    text: "What I liked most about DV Analytics is the friendly environment. The mentors are always available to clear doubts, even after class hours. I was very nervous about coding, but the step-by-step approach helped me a lot. The Data Science and GenAI course covers everything from Python basics to advanced AI tools. If you want practical learning and supportive teachers, you should visit their center. It was a great learning experience for me"
  },
  {
    id: "rev-10",
    name: "Srinivas K",
    rating: 5,
    date: "6 months ago",
    details: "1 review",
    avatarBg: getAvatarColor("Srinivas K"),
    text: "I was looking for a good Data Science course in Bangalore to switch my career from a non-tech background, and I am glad I found DV Analytics. The trainers here use very simple examples which helped me understand complex topics easily. The best part was the GenAI training module. It is very updated and in demand right now. We worked on real-time projects that gave me confidence during interviews. If you are a beginner looking for the best data science institute, this is a great place to start."
  },
  {
    id: "rev-11",
    name: "Nandan Acharya",
    rating: 5,
    date: "7 months ago",
    details: "1 review · 1 photo",
    avatarBg: getAvatarColor("Nandan Acharya"),
    text: "Joined DVA in Sept, 2025. The course structure is well planned, covering tools like Excel, SQL, Python, SAS , Tableau, Power BI, etc, Which is helping me gain confidence in science. Doubt-clearing sessions and Buddy support system are very helpful. Overall, DV Analytics is a good place for students who want strong fundamentals and practical exposure in data science. Deb sir, Ronasmita mam and Raj sir have been very helpful in every step. Will update again after I finish the course.."
  },
  {
    id: "rev-12",
    name: "Lohit B",
    rating: 4,
    date: "a month ago",
    details: "1 review",
    avatarBg: getAvatarColor("Lohit B"),
    text: "I was working in sales but because of the pressure I wanted to switch to tech and then my friend suggest me about dv analytics and the mentors are very good and they helped me to learn things from very basic and I got a offer from a company with a decent package"
  },
  {
    id: "rev-13",
    name: "Ayushi Jain",
    rating: 5,
    date: "7 months ago",
    details: "5 reviews",
    avatarBg: getAvatarColor("Ayushi Jain"),
    text: "DV Analytics offers strong analytics expertise with a professional, job-focused approach. Good experienced. Happy to be a part of Dv analytics"
  },
  {
    id: "rev-14",
    name: "Raaj Dash",
    rating: 5,
    date: "11 months ago",
    details: "2 reviews · 1 photo",
    avatarBg: getAvatarColor("Raaj Dash"),
    text: "DV Analytics, my friend's sister was enrolled in this institute and completed her Data Science course within six months. She's now employed by a prestigious Noida based company! The comprehensive curriculum covered essential tools like Excel, SQL, Python, SAS, PowerBI, Tableau, and Alteryx, alongside crucial Machine Learning and Generative AI skills. She did real-time projects which really helped her ace the interview.\n\nThe entire staff and faculty were exceptional. This institute is the perfect launchpad for a successful career in today's competitive job market. Highly recommended!"
  },
  {
    id: "rev-15",
    name: "Selvagugan vidhya Lakshmi Thamilselvun",
    rating: 5,
    date: "2 years ago",
    details: "5 reviews",
    avatarBg: getAvatarColor("Selvagugan vidhya Lakshmi Thamilselvun"),
    text: "As a student, I can confidently say DV Analytics is the best data science training institute with placement. The instructors are incredibly skilled, the learning environment is supportive, and the placement opportunities provided are outstanding. I am grateful for the knowledge gained and the career prospects this institute has opened up for me. Highly recommended!"
  },
  {
    id: "rev-16",
    name: "Saurav Kumar",
    rating: 5,
    date: "2 years ago",
    details: "Local Guide · 19 reviews · 1 photo",
    isLocalGuide: true,
    avatarBg: getAvatarColor("Saurav Kumar"),
    text: "A good data science institute for those who want to build their career in data science, especially for those from a non-technical background. This institute is also beneficial because professional mentors teach from the basics to Advance. Both offline and online classes are good, and we get a lot of motivation for our future career goals. I highly recommend DV Analytics"
  },
  {
    id: "rev-17",
    name: "iamashpdata",
    rating: 5,
    date: "a year ago",
    details: "1 review",
    avatarBg: getAvatarColor("iamashpdata"),
    text: "One of the best Data Science, Data Analytics and Agentic AI training institutes. MY sister was enrolled in here in 2024 mid and within 6 months she completed her course. Now she has landed at job with a reputed company in Pune. She took admission in Data Science course and learnt various tools like Excel, SQL, Python, SAS, PowerBI, Tableau, Alteryx along with Machine Learning and GenAI.\n\nAll staff and faculty are very good I must say. This is the place to learn and get your job in the competitive market."
  },
  {
    id: "rev-18",
    name: "Saroj Parida",
    rating: 5,
    date: "a year ago",
    details: "Local Guide · 6 reviews · 13 photos",
    isLocalGuide: true,
    avatarBg: getAvatarColor("Saroj Parida"),
    text: "DV ANALYTICS IS BEST AMONG ALL !!!\n\nLet me tell you , What really stands out is their placement support. The institute has strong ties with industry leaders.\nFounder along with cofounder works tirelessly to help students land relevant jobs.\n\nThe hands-on projects and case studies were particularly valuable in applying theory to practice. I highly recommend this institute to anyone looking to build or enhance their skills in data science!"
  },
  {
    id: "rev-19",
    name: "Sri Rangam",
    rating: 5,
    date: "2 years ago",
    details: "5 reviews",
    avatarBg: getAvatarColor("Sri Rangam"),
    text: "Certainly! DV Analytics stands out as the best data science training institute with placement support. The comprehensive curriculum, expert trainers, and hands-on projects provide a robust learning experience. The institute's emphasis on real-world skills and industry connections ensures students are well-prepared for the job market. The dedicated support staff and effective placement assistance make it an ideal choice for aspiring data scientists. I am grateful for my experience there, and I am now confidently pursuing a career in data science, all thanks to DV Analytics."
  },
  {
    id: "rev-20",
    name: "Issita priyadarsini",
    rating: 5,
    date: "a year ago",
    details: "2 reviews",
    avatarBg: getAvatarColor("Issita priyadarsini"),
    text: "DV Data Analytics is a great place to learn Data Science and Analytics in Bangalore. The place has experienced faculty members from across the country teaching us the basics and advanced elements of tools like Excel, SQL, Python, PowerBI, Tableau, Machine Learning and Generative AI.\nThe real time projects that we are offered in domains like Banking, Retail, Insurance, etc gives us the confidence to survive in the competitive job market of today. Come to DV Analytics, go for a high flying corporate career."
  },
  {
    id: "rev-21",
    name: "SURYAKANT PRADHAN",
    rating: 5,
    date: "a year ago",
    details: "6 reviews",
    avatarBg: getAvatarColor("SURYAKANT PRADHAN"),
    text: "I am Suryakant Pradhan and known as Odisha Ranji All-rounder. I came to Bangalore to play OPL ans met Dev Sir first time. When I heard many people from Odisha who learnt Data Science from him got job, hence I also sent my brother to study at DV Analytics. It was 2018 when my brother took admission at DV Analytics and Today 2025 both my brother and his wife are the Data Scientist and working in Big MNCs in Bangalore. I must thanks to Dev Sir and DV Analytics\n\nWish him all the success ahead. A best place to find a career mentor"
  },
  {
    id: "rev-22",
    name: "Abhisek Debata",
    rating: 5,
    date: "4 years ago",
    details: "1 review",
    avatarBg: getAvatarColor("Abhisek Debata"),
    text: "Dv is the great place to learn Data Science. Dev Sir is very committed to every student's success. All classes are live, and all doubts are clarified. The live projects are the key point to achieve success. The class material and assignments is more than adequate for you to grasp all concepts. I would highly recommend for anyone interested in Data Science to join DV analytics"
  },
  {
    id: "rev-23",
    name: "Chandan A",
    rating: 5,
    date: "4 years ago",
    details: "2 reviews · 3 photos",
    avatarBg: getAvatarColor("Chandan A"),
    text: "DV Analytics is a best Data Science Institute. With a wide and extraordinary classes, they also helps us with business development strategies, projects across different industries. Mentors guide every step of the journey."
  },
  {
    id: "rev-24",
    name: "Vibhash Pateria",
    rating: 5,
    date: "4 years ago",
    details: "1 review",
    avatarBg: getAvatarColor("Vibhash Pateria"),
    text: "D V Analytics is best training institute in India for learning DATA SCIENCE.\n\nExperienced Faculty (Dev Sir) and Helpful & communicative support staff is among the finest in the industry."
  },
  {
    id: "rev-25",
    name: "Manideep Kasina",
    rating: 5,
    date: "4 years ago",
    details: "Local Guide · 21 reviews",
    isLocalGuide: true,
    avatarBg: getAvatarColor("Manideep Kasina"),
    text: "This is the best career decision I have made till date to join in DV Analytics. Dev sir explanation is top notch. He covers a lot of content in very short time while making sure it is easy to understand. Assignments helped me to get deeper understanding of the concepts explained in class. Materials and recording sessions are to the point for quick revision as well as to clear our doubts on our own. This is my experience till now. Looking forward to update it on curriculum and placements."
  },
  {
    id: "rev-26",
    name: "Shreejil PV",
    rating: 5,
    date: "4 years ago",
    details: "Local Guide · 11 reviews · 17 photos",
    isLocalGuide: true,
    avatarBg: getAvatarColor("Shreejil PV"),
    text: "Great place to learn! Dev Sir is very committed to every student's success. They have started offering online classes since the pandemic began. All classes are live, and all doubts are clarified. The class material and assignments is more than adequate for you to grasp all concepts. I would highly recommend for anyone interested in Data Science."
  },
  {
    id: "rev-27",
    name: "Soumyaranjan Sutar",
    rating: 5,
    date: "4 years ago",
    details: "1 review",
    avatarBg: getAvatarColor("Soumyaranjan Sutar"),
    text: "I would like to thank DV Analytics support staff and faculties especially Dev sir. I joined DV recently and I was not confident because of my non IT background but after attending regular classes and doing assignments I feel very confident that I can be a data scientist. This is one of the best institute to learn data science for IT as well as non IT students."
  },
  {
    id: "rev-28",
    name: "Duryadha Sethi",
    rating: 5,
    date: "2 years ago",
    details: "1 review",
    avatarBg: getAvatarColor("Duryadha Sethi"),
    text: "DV is best choice if you are deciding to build Data Science as a professional career. The best thing about DV is the Mentor- Mentee Strategy adopted by them for hand holding of each student till they get Placement. Further,\nthey conduct various Trainings/ Workshops by Industry Experts who helps students to understand the use of various Data Science Tools in real world."
  },
  {
    id: "rev-29",
    name: "raina goswami",
    rating: 5,
    date: "3 years ago",
    details: "3 reviews",
    avatarBg: getAvatarColor("raina goswami"),
    text: "DV Institute is a place which you can look up for carrier change and also personally for me it's a course content and delivery is all what let you into a good profile as Data Analyst, DV is one of the India's best institute as many training institute and online platform are available these day but a content is not been well aligned in most of these places as my personal experience you will end up with no results after working hard, however when it's comes to DV content is well aligned with industry requirements and assignments are been designed in such a fashion like if you practice those no-one, can stop you bagging a very good offer,as it's all about developing a skill set and don't worry at all about anything if you do your part.\n\nDV will always been supportive to every student."
  },
  {
    id: "rev-30",
    name: "srinija 2000",
    rating: 5,
    date: "4 years ago",
    details: "2 reviews",
    avatarBg: getAvatarColor("srinija 2000"),
    text: "One of the best and finest institute to learn Data Science . Mr.Dev sir teaches good subject with real time examples. They have amazing industry updated syllabus. They also provide internships with guarantee job assistance. I really recommend this institute to learn Data Science course.\n\nPositive: Communication, Quality, Professionalism, Value"
  },
  {
    id: "rev-31",
    name: "raj pahan",
    rating: 5,
    date: "6 years ago",
    details: "7 reviews · 1 photo",
    avatarBg: getAvatarColor("raj pahan"),
    text: "It's a best institute to start a carrier in Data science, trust me you have the best teachers who are teaching here. \"DV Analytics Training Institute\" is a second home for me. I am a beginner to this field but before coming here i thought that this may be difficult for me, but no problem every path is hard before walking into it. Ask Dev sir for the guidance, I am 100% sure that he will guide you throughout your entire journey of Data Science.\n\nThanks to DV analytics for providing me a nice platform where i am feeling much confident."
  },
  {
    id: "rev-32",
    name: "Shreemaye Das",
    rating: 5,
    date: "2 years ago",
    details: "1 review",
    avatarBg: getAvatarColor("Shreemaye Das"),
    text: "The best institute for the students who want to build their career in the field of data analyst, irrespective of the educational background. The best assistance you can get from the mentors and very ease to access everyone out there."
  },
  {
    id: "rev-33",
    name: "dinesh nayak",
    rating: 5,
    date: "6 years ago",
    details: "2 reviews · 3 photos",
    avatarBg: getAvatarColor("dinesh nayak"),
    text: "After my friends suggestion I joined DV Analytics to start my Data Science Journey. It is only institution which provide knowledge from scratch.\nThe methodology and content they provide is second to none.\nRigorous assignment helps you to have hands-on experience, capstone projects which are Domain specific helps a candidate to have better idea of the industry.\nFor me DV Analytics is one of the best institution and I would like to thank Debendra Sir for giving everyone a opportunity to excel.\n\nPositive: Communication, Quality, Value"
  },
  {
    id: "rev-34",
    name: "Rahul Ghorpade",
    rating: 5,
    date: "Edited 4 years ago",
    details: "5 reviews",
    avatarBg: getAvatarColor("Rahul Ghorpade"),
    text: "If someone wants to build his career in Data Science field than DV Analytics is the best place for this. Faculties are best in their respective subjects and specially Dev sir , he is teacher cum guide for us .\n👍 Best place to learn."
  },
  {
    id: "rev-35",
    name: "Santosh Mohapatra",
    rating: 5,
    date: "7 years ago",
    details: "2 reviews",
    avatarBg: getAvatarColor("Santosh Mohapatra"),
    text: "Very good institute for data analytics, machine learning and deep learning . They do care and help boosting your confidence through out. Training model from non-technical to technical expertise is highly supportive. Mr.Dev is having vast experience into data analytics and his guidance is must winning attitude. Thanks to DV Analytics"
  },
  {
    id: "rev-36",
    name: "Vijith Visweswaran",
    rating: 5,
    date: "3 years ago",
    details: "Local Guide · 9 reviews",
    isLocalGuide: true,
    avatarBg: getAvatarColor("Vijith Visweswaran"),
    text: "Any one who wants to get into the field of Data can definitely check this place. At this place you wont just learn a lot, the placement support DV gives its students is insanely strong. Deb sir and Venky sir are genius in their field and to learn from them was just amazing experience."
  },
  {
    id: "rev-37",
    name: "Rachit Gulati",
    rating: 5,
    date: "7 years ago",
    details: "Local Guide · 79 reviews · 9 photos",
    isLocalGuide: true,
    avatarBg: getAvatarColor("Rachit Gulati"),
    text: "DV Analytics is much more than just a regular coaching class. It is a place to learn, grow and develop from scratch. The trainer Mr. Devendra is a very passionate teacher, a rare kind I must say. He is one who motivates you, mentors you and gets the job done. I must say if you really want to get into analytics, this is the place for you to hover your path into. Thank you DV Analytics for everything that you have ever done for every student of yours. Happy Coaching!"
  },
  {
    id: "rev-38",
    name: "Sakshi Bhardwaj",
    rating: 5,
    date: "5 years ago",
    details: "3 reviews",
    avatarBg: getAvatarColor("Sakshi Bhardwaj"),
    text: "DV analytics is a best Data Science I known so far. With a wide and extra ordinary classes, they also helped me with business development strategies, projects across different industries.\nDev sir is really a good human being and have fierce knowledge across data analytics industry.\n\nPositive: Communication, Quality, Professionalism, Value"
  },
  {
    id: "rev-39",
    name: "Abhijit Nayak",
    rating: 5,
    date: "5 years ago",
    details: "Local Guide · 40 reviews · 196 photos",
    isLocalGuide: true,
    avatarBg: getAvatarColor("Abhijit Nayak"),
    text: "This is the best institute for data science complete program.They are currently offering data science program in 3 different segments. If you want to grow your career in data science field , definitely you should check out and join the demo class, after the class you will be sure and all your confusion about data science will be gone. Even they are providing international (European n American format ) certification in data science ."
  },
  {
    id: "rev-40",
    name: "Nibedita Biswal",
    rating: 5,
    date: "5 years ago",
    details: "1 review",
    avatarBg: getAvatarColor("Nibedita Biswal"),
    text: "DV Analytics is not just a institute which will teach you the tools only , they will help you with your placements also and once you are into this institute they will be connected to you as long as you want . Most important think is the quality of teaching, co-ordination with faculties, the way they take care of each and every bit of your growth with and I can guarantee you with the same.\nDo join DV Analytics and have a recognizable growth in your career.\n\nPositive: Communication, Quality, Professionalism, Value"
  },
  {
    id: "rev-41",
    name: "Shivangi Panthi",
    rating: 5,
    date: "4 years ago",
    details: "6 reviews",
    avatarBg: getAvatarColor("Shivangi Panthi"),
    text: "I am a student of dv and I am glad to be the part of institute.This is the best institute for data scientist course.\nI am not from IT background but then to I m able to learn due to the facilities provided by the institute such as live classes,any time access to recorded class videos,doubts clearing facilities and many more.\nI really recommend that if any one is looking for data scientist course then dv is the best option."
  },
  {
    id: "rev-42",
    name: "Raju",
    rating: 5,
    date: "5 years ago",
    details: "1 review",
    avatarBg: getAvatarColor("Raju"),
    text: "DV Analytics has been a great place for my learning and my career growth. The training in DV Analytics has helped me prosper in my career as well as building a lot of knowledge everyday. The team members in DV Analytics are well skilled, amazing, supportive, and extremely helpful. We get to learn a lot of tools like SAS, R, SQL, Python, ML, etc....\n\nPositive: Communication, Quality, Professionalism, Value"
  },
  {
    id: "rev-43",
    name: "Sarada Mohanty",
    rating: 5,
    date: "6 years ago",
    details: "11 reviews · 3 photos",
    avatarBg: getAvatarColor("Sarada Mohanty"),
    text: "From my experiences, I can say, DV Analytics is the best data science training institute in the market with a full data science course and a great job assistant support... Only you need to be dedicated and committed to your data scientist goals.\n\nPositive: Communication, Quality, Value"
  },
  {
    id: "rev-44",
    name: "Anil Mamodi",
    rating: 5,
    date: "4 years ago",
    details: "5 reviews",
    avatarBg: getAvatarColor("Anil Mamodi"),
    text: "DV Analytics is the best institute in India,if anyone want to transform their carrier in Data Science. Dev sir is committed to each students success and staff faculty is supportive."
  },
  {
    id: "rev-45",
    name: "Anshuman Mishra",
    rating: 5,
    date: "5 years ago",
    details: "6 reviews · 8 photos",
    avatarBg: getAvatarColor("Anshuman Mishra"),
    text: "DV Analytics is a leader in the Data Science education industry. I have utmost respect for the pedagogy followed. The trainers have a decent real time industry experience which allows them to impart practical knowledge and logical problem solving approach."
  },
  {
    id: "rev-46",
    name: "Sanal K",
    rating: 5,
    date: "7 years ago",
    details: "5 reviews",
    avatarBg: getAvatarColor("Sanal K"),
    text: "I have studied in different colleges, universities, schools, and institutes. From the experience I have accumulated over the years, I can make this statement with confidence that \"this is the best institute that I have ever studied in\". Dev sir makes sure that he goes above and beyond for each and every student who studies here. No single person on this earth can guarantee a placement but I can say that the probability of you getting placed in a company after the guidance from Dev sir is 99.9 percent. Rest is on you to study and prepare for the interview. I don't think a human being can help you more than this to learn."
  },
  {
    id: "rev-47",
    name: "Laxmipriya Parida",
    rating: 5,
    date: "6 years ago",
    details: "7 reviews",
    avatarBg: getAvatarColor("Laxmipriya Parida"),
    text: "I'm really happy I've chosen to do the course with DV analytics. The course is well-structured and highly informative, the tutors are proficient and supportive. I felt I was guided properly every single day of the course. I want to thank all the tutors, but especially Deb Sir, whom I truly admire, for his commitment, professionalism and support, and Adam, whose feedback was so encouraging just at the moment I was feeling hopeless. Huge thanks to you Sir And DV!"
  },
  {
    id: "rev-48",
    name: "Prabhudatta Pattanayak",
    rating: 5,
    date: "3 years ago",
    details: "3 reviews",
    avatarBg: getAvatarColor("Prabhudatta Pattanayak"),
    text: "The best decission I took ever in my life is to join DV...it's not just an institute rather than Its a temple of education.The guidance and the way the mentors teach here cannt be compared with any other data science institutes so far.There is no boundary to reach to mentors and clear ur doubts instantly.And Dev sir,he is the man who is working day and night so that each students can get placed.He is the man who stand with each students till they get success. He is a gem and very rare to find such a human being who is alwys there for his students.His guidance and endless support has helped many students earlier and is still continuing to do so.From doubt clearing to preparing resume and getting placed everything is taken care of properly by him.\nIt's worth to pay as ur carrier is going to settle down and u r learning skills too and if u are thinking to join DV Analytics then join without thinking of anything.U r in the right path and everything will be taken care off for sure."
  },
  {
    id: "rev-49",
    name: "Dhananjay Sah",
    rating: 5,
    date: "4 years ago",
    details: "7 reviews",
    avatarBg: getAvatarColor("Dhananjay Sah"),
    text: "Here in DV training is excellent with good interaction. Recording facility is very helpful for revising . Course is very practical and informative. Dev Sir provides real time contents, examples which is very helpful to understand ."
  },
  {
    id: "rev-50",
    name: "Kalli Raj",
    rating: 5,
    date: "4 years ago",
    details: "1 review",
    avatarBg: getAvatarColor("Kalli Raj"),
    text: "Dv analytics is an excellent training institute with very helpful facilities. The director Mr Dev Sir is very helpful. He personally trains people in various tools and assists people. Also special thanks to Mr Ajith sir for making sure that his team supported me and ensured that all the session is completed successfully. I was not confident when I joined but gradually after speaking to Debendra Das sir and Ajith Kumar Gopalakrishna sir, my confidence sky rocketed.\n\nThanks to everyone who assisted me through out my journey at DV Analytics."
  },
  {
    id: "rev-51",
    name: "Roopesh Mohapatra",
    rating: 5,
    date: "3 years ago",
    details: "3 reviews",
    avatarBg: getAvatarColor("Roopesh Mohapatra"),
    text: "If you really think that it's hard to be a data scientist or data Analyst then Dv Analytics is the right place to join to know how easy it is to be a data analyst .\n\nI am saying because earlier I myself even though that coding is really hard but the day I joined and started learning i came to know it's all easy if you get a right tutor because the way they will nurture you in this 6 month's will definitely make you get placed in some good MNC.\n\n#Dv Analytics #Dvtian"
  }
];

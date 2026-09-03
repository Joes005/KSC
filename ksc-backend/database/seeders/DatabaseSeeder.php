<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\SiteSetting;
use App\Models\Branch;
use App\Models\Facility;
use App\Models\GalleryImage;
use App\Models\NewsEvent;
use App\Models\University;
use App\Models\ProgrammeCategory;
use App\Models\Programme;
use App\Models\PageContent;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedUsers();
        $this->seedSettings();
        $this->seedBranches();
        $this->seedFacilities();
        $this->seedNewsEvents();
        $this->seedUniversities();
        $this->seedGallery();
        $this->seedPages();
    }

    /* ---------------------------------------------------------------------- */
    private function seedUsers(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@ksc.in'],
            [
                'name' => 'admin',
                'password' => Hash::make('admin123'),
            ]
        );
    }

    /* ---------------------------------------------------------------------- */
    private function seedSettings(): void
    {
        $settings = [
            'site.name' => 'KARUR STUDY CENTER',
            'site.short_name' => 'KSC',
            'site.tagline' => 'Distance Education Admissions & Study Centre',
            'site.description' => 'Karur Study Center (KSC) is a study centre in Karur, Tamil Nadu that helps students enrol in UG, PG, Diploma, Certificate and Vocational distance-education programmes offered by state open universities.',
            'site.admission_year' => 'Academic Year 2026',
            'site.admission_open' => 'Admissions Open — Academic Year 2026',
            'site.last_date' => 'Last date for admission: 31 July 2026',
            'contact.phone' => '99651 07404',
            'contact.landline' => '04324 236107',
            'contact.whatsapp' => '919965107404',
            'contact.email' => 'Karurstudycentre1@gmail.com',
            'contact.address' => 'M.R.S. Plaza, 3rd Floor, 57-59, J-S-PS Complex, Near Mini Bus Stand, Karur - 1',
            'socials.facebook' => 'https://www.facebook.com/Karurstudycentre',
            'socials.instagram' => 'https://www.instagram.com/karur_study_centre',
            'socials.youtube' => 'https://www.youtube.com/@karurstudycentrecentre1507',
            'socials.website' => 'https://distanceeducationstudycentre.com/edu',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value, 'type' => 'text']);
        }
    }

    /* ---------------------------------------------------------------------- */
    private function seedBranches(): void
    {
        $branches = [
            [
                'name' => 'Karur Study Centre',
                'address' => 'M.R.S. Plaza, 3rd Floor, 57-59, J-S-PS Complex, Near Mini Bus Stand, Karur - 1',
                'phone' => '04324 236107 · 99651 07404, 93622 23107',
                'hours' => null,
                'is_head_office' => true,
                'sort_order' => 0,
            ],
            [
                'name' => 'Pace Computer College',
                'address' => 'Near Bus Stand, Kangayam - 638 701',
                'phone' => '98652 22107, 93622 24107',
                'hours' => null,
                'is_head_office' => false,
                'sort_order' => 1,
            ],
            [
                'name' => 'S.S. Institute',
                'address' => '75/38, Scheme Road, Raja Complex, 2nd Floor, Opposite Bus Stand, Dindigul - 3.',
                'phone' => '90872 22107, 90472 22107',
                'hours' => null,
                'is_head_office' => false,
                'sort_order' => 2,
            ],
        ];

        foreach ($branches as $branch) {
            Branch::updateOrCreate(['name' => $branch['name']], $branch);
        }
    }

    /* ---------------------------------------------------------------------- */
    private function seedFacilities(): void
    {
        $facilities = [
            ['title' => 'Low Fees', 'icon' => 'Wallet', 'description' => 'Distance-education fee structures that fit an ordinary family budget, with no hidden charges.'],
            ['title' => 'Flexible Payment', 'icon' => 'CalendarRange', 'description' => 'Pay in convenient instalments spread across the academic year.'],
            ['title' => 'Study Materials', 'icon' => 'BookOpen', 'description' => 'Printed and digital Self-Learning Materials from the university, collected at our centre.'],
            ['title' => 'Digital Library', 'icon' => 'Library', 'description' => 'e-resources and reference access to support self-study from home.'],
            ['title' => 'Student Support', 'icon' => 'Headphones', 'description' => 'A dedicated local team to answer queries on admissions, exams and results.'],
            ['title' => 'Online Admission', 'icon' => 'MonitorPlay', 'description' => 'Guided online application filling at our centre for candidates who need help.'],
            ['title' => 'Easy Access', 'icon' => 'MapPinned', 'description' => 'Located in the heart of Karur with convenient timings for working learners.'],
            ['title' => 'Offline / Online Classes', 'icon' => 'MonitorSmartphone', 'description' => 'Optional contact classes and online sessions to supplement self-study.'],
            ['title' => 'Infrastructure', 'icon' => 'Building2', 'description' => 'Well-maintained premises for counselling, document processing and study-material distribution.'],
        ];

        foreach ($facilities as $facility) {
            Facility::updateOrCreate(['title' => $facility['title']], $facility);
        }
    }

    /* ---------------------------------------------------------------------- */
    private function seedNewsEvents(): void
    {
        $news = [
            ['title' => 'Admissions are open for the Academic Year 2026 — TNOU, Bharathidasan University and Alagappa University.', 'badge' => 'admission', 'link' => '/admissions', 'is_active' => true],
            ['title' => 'Last date for admission: 31 July 2026', 'badge' => 'deadline', 'link' => '/admissions', 'is_active' => true],
            ['title' => 'TNOU exam time-table released — check the Exam Update page.', 'badge' => 'exam', 'link' => '/exam-update', 'is_active' => true],
            ['title' => 'BDU semester examinations — hall tickets available on the university portal.', 'badge' => 'exam', 'link' => '/exam-update#bdu', 'is_active' => true],
            ['title' => 'Alagappa University (CDOE) — July session admissions open for UG, PG, Diploma & Certificate programmes.', 'badge' => 'admission', 'link' => '/academic#alagappa', 'is_active' => true],
            ['title' => 'Alagappa University — exam hall tickets & time-tables on the official distance MIS portal.', 'badge' => 'exam', 'link' => '/exam-update#alagappa', 'is_active' => true],
        ];

        foreach ($news as $item) {
            NewsEvent::updateOrCreate(['title' => $item['title']], $item);
        }
    }

    /* ---------------------------------------------------------------------- */
    private function seedUniversities(): void
    {
        $universities = $this->universityData();

        foreach ($universities as $uni) {
            $university = University::updateOrCreate(
                ['slug' => $uni['slug']],
                array_filter([
                    'name' => $uni['name'],
                    'short_name' => $uni['short_name'],
                    'academic_year' => $uni['academic_year'],
                    'pattern' => $uni['pattern'] ?? null,
                    'recognition' => $uni['recognition'] ?? null,
                    'address' => $uni['address'] ?? null,
                    'website' => $uni['website'] ?? null,
                    'logo' => $uni['logo'] ?? null,
                    'exam_note' => $uni['exam']['note'] ?? null,
                    'exam_hall_ticket_url' => $uni['exam']['hallTicketUrl'] ?? null,
                    'exam_timetable_url' => $uni['exam']['timetableUrl'] ?? null,
                    'exam_syllabus_url' => $uni['exam']['syllabusUrl'] ?? null,
                ])
            );

            foreach ($uni['categories'] as $cat) {
                $category = ProgrammeCategory::updateOrCreate(
                    ['university_id' => $university->id, 'slug' => $cat['slug']],
                    [
                        'label' => $cat['label'],
                        'count' => $cat['count'] ?? count($cat['programmes']),
                        'note' => $cat['note'] ?? null,
                    ]
                );

                foreach ($cat['programmes'] as $programme) {
                    Programme::updateOrCreate(
                        ['programme_category_id' => $category->id, 'name' => $programme['name']],
                        array_filter([
                            'medium' => $programme['medium'] ?? null,
                            'pattern' => $programme['pattern'] ?? null,
                            'duration' => $programme['duration'] ?? null,
                            'eligibility' => $programme['eligibility'] ?? null,
                        ])
                    );
                }
            }
        }
    }

    /* ---------------------------------------------------------------------- */
    private function seedGallery(): void
    {
        $source = base_path('../ksc-frontend/public/assets/gallery');
        if (! is_dir($source)) {
            return;
        }

        // ksc-05..ksc-08 were removed: those files were internal reference photos
        // (photocopied course-eligibility sheets and a handwritten notes page that
        // included a Gmail password) mistakenly seeded as public gallery photos.
        // They must never be re-added here.
        $images = [
            ['file' => 'ksc-09.jpg', 'caption' => 'Study Center Overview', 'alt' => 'Karur Study Center — wider view of the centre', 'sort' => 5],
            ['file' => 'ksc-10.jpg', 'caption' => 'Center Interior', 'alt' => 'Karur Study Center — interior and seating area', 'sort' => 6],
            ['file' => 'ksc-11.jpg', 'caption' => 'Center Front & Exterior', 'alt' => 'Karur Study Center — front and exterior', 'sort' => 7],
            ['file' => 'tnou-ay2026.jpg', 'caption' => 'TNOU — AY 2026 Admission Flyer', 'alt' => 'Tamil Nadu Open University — Academic Year 2026 admission flyer', 'sort' => 8],
            ['file' => 'ksc-12.jpg', 'caption' => 'Our Computer Lab', 'alt' => 'Karur Study Center computer lab with students at workstations', 'sort' => 9],
            ['file' => 'ksc-13.jpg', 'caption' => 'Contact Class in Session', 'alt' => 'A management studies class in session at Karur Study Center', 'sort' => 10],
            ['file' => 'ksc-14.jpg', 'caption' => 'Alagappa University Convocation — Our Graduates', 'alt' => 'KSC students at the Alagappa University convocation ceremony', 'sort' => 11],
            ['file' => 'ksc-15.jpg', 'caption' => 'Study Material Library', 'alt' => 'Shelves of study material and student records at Karur Study Center', 'sort' => 12],
            ['file' => 'ksc-16.jpg', 'caption' => 'MRS Plaza, Karur — Our Building', 'alt' => 'MRS Plaza — Karur Study Center signage on the building front', 'sort' => 13],
        ];

        // Prune any gallery row that is no longer in the list above (in particular,
        // this removes the ksc-05..ksc-08 rows described above from the live DB).
        $keepPaths = collect($images)->map(fn ($i) => 'gallery/'.$i['file'])->all();
        GalleryImage::whereNotIn('image_path', $keepPaths)->get()->each(function ($stale) {
            Storage::disk('public')->delete($stale->image_path);
            $stale->delete();
        });

        foreach ($images as $image) {
            $path = $source.'/'.$image['file'];
            if (! is_file($path)) {
                continue;
            }

            $target = 'gallery/'.$image['file'];
            Storage::disk('public')->put($target, file_get_contents($path));

            GalleryImage::updateOrCreate(
                ['image_path' => 'gallery/'.$image['file']],
                [
                    'caption' => $image['caption'],
                    'alt' => $image['alt'],
                    'sort_order' => $image['sort'],
                ]
            );
        }
    }

    /* ---------------------------------------------------------------------- */
    private function seedPages(): void
    {
        $pages = [
            'home' => [
                'hero' => [
                    'headline' => 'Karur Study Center',
                    'subHeadline' => 'Your trusted study centre for distance education',
                    'description' => 'Get expert admission guidance for UG, PG, Diploma, Certificate and Vocational programmes from Tamil Nadu Open University (TNOU), Bharathidasan University (BDU) and Alagappa University (ALU) — all from right here in Karur, with continuous support through exams and results.',
                    'ctas' => [
                        ['label' => 'Explore Programmes', 'to' => '/academic', 'primary' => true],
                        ['label' => 'Apply Now', 'to' => '/admissions', 'primary' => false],
                    ],
                ],
                'why_distance' => [
                    ['title' => 'Flexibility', 'description' => 'Study at your own pace while you work, raise a family, or live in a remote area. No need to travel to a campus every day.'],
                    ['title' => 'Accessibility', 'description' => 'Open to learners of varied backgrounds and prior qualifications. Remove the barriers of location and rigid class timings.'],
                    ['title' => 'Career Advancement', 'description' => 'Upgrade your skill set and qualifications without giving up your current job or income stream.'],
                    ['title' => 'Affordability', 'description' => 'Distance programmes are significantly cheaper than regular degrees while holding the same UGC-DEB-recognised value.'],
                    ['title' => 'Diverse Offerings', 'description' => 'Choose from UG, PG, Diploma, Certificate, Vocational and Short-Term programmes across multiple universities.'],
                ],
                'about_snapshot' => [
                    'text' => [
                        'Karur Study Center (KSC) is a dedicated distance-education study and admission centre based in Karur, Tamil Nadu. We bridge the gap between open universities and students — helping you pick the right programme, submit a correct application, and stay supported through exams and results.',
                        'Our services are designed for working professionals, homemakers and students from remote areas who want recognised degrees without relocating or abandoning their commitments.',
                    ],
                    'readMoreLink' => '/about',
                    'body' => [
                        'Karur Study Center (KSC) is a dedicated distance-education study and admission centre based in Karur, Tamil Nadu. Since our inception we have been bridging the gap between open universities and students — helping you pick the right programme, submit a correct application, and stay supported through exams and results.',
                        'Our services are designed for working professionals, homemakers and students from remote areas who want recognised degrees without relocating or abandoning their commitments. We are affiliated with Alagappa University, Bharathidasan University, Manonmaniam Sundaranar University, and Tamilnadu Open University, and guide learners through every stage of their academic journey.',
                        'From programme counselling and document verification to study-material support, exam updates and result guidance, our team walks with you until you earn your degree. With more than 50,000 learners served, KSC has grown into a trusted name for open and distance education in the region.',
                    ],
                    'membership' => [
                        'Partner study centre of Alagappa University',
                        'Recognised centre of Bharathidasan University',
                        'Authorised study centre of Manonmaniam Sundaranar University',
                        'Authorised study centre of Tamilnadu Open University',
                        'Affiliated with UGC-DEB recognised distance education',
                    ],
                    'establishedYear' => '2006',
                ],
                'vision_mission' => [
                    'vision' => 'To become the most trusted study centre in Tamil Nadu for distance education — making recognised, affordable, good-quality higher education accessible to every learner.',
                    'mission' => [
                        'Provide clear, unbiased information about programmes offered by our affiliated open universities.',
                        'Guide every applicant through a smooth, transparent admission process.',
                        'Support students with study materials, exam updates and ongoing mentorship.',
                        'Keep education affordable and convenient for working professionals and remote learners.',
                    ],
                    'values' => [
                        ['title' => 'Accessibility', 'description' => 'Education within reach of every learner, irrespective of location or schedule.'],
                        ['title' => 'Integrity', 'description' => 'Honest, transparent information and ethical admission guidance.'],
                        ['title' => 'Student-First Support', 'description' => 'Personalised assistance tailored to each student\'s needs.'],
                        ['title' => 'Academic Excellence', 'description' => 'High standards in the guidance we offer and the outcomes we aim for.'],
                        ['title' => 'Flexibility', 'description' => 'Services that adapt to varied learner circumstances.'],
                        ['title' => 'Lifelong Learning', 'description' => 'Encouraging skill development and continuing education at every age.'],
                    ],
                ],
                'admission_steps' => [
                    ['step' => '01', 'title' => 'Download Form', 'description' => 'Collect the application form from our centre or download it from the university portal.'],
                    ['step' => '02', 'title' => 'Submit Documents', 'description' => 'Submit the filled form along with copies of mark sheets, photo and ID proof.'],
                    ['step' => '03', 'title' => 'Pay Fees', 'description' => 'Pay the prescribed course fee through the university/nominated bank channels.'],
                    ['step' => '04', 'title' => 'Receive Study Material', 'description' => 'Receive your enrolment confirmation and study material to begin learning.'],
                ],
            ],
            'about' => [
                'about_page' => [
                    'establishedYear' => '2006',
                    'intro' => 'Karur Study Center (KSC) is a distance-education study and admission centre located in Karur, Tamil Nadu. We help learners enrol in recognised open-university and distance-education programmes — guiding them from choosing the right course to receiving their study material and clearing their examinations.',
                    'body' => [
                        'Distance education has changed the way people in small towns and rural Tamil Nadu access higher education. Working professionals, homemakers, and students who cannot relocate now have access to the same recognised degrees, taught by government universities, without leaving home. KSC exists to make that pathway simple and reliable.',
                        'We act as the local bridge between open universities and students. We keep up-to-date information on programmes, eligibility, fees and deadlines; we help you complete and verify your application; and we stay with you through the entire study period with exam updates, hall-ticket guidance and result alerts.',
                        'Our team is committed to honest, transparent guidance. We never push a course you don\'t need — we help you find the one that fits your background, budget and career goal.',
                    ],
                    'membership' => [
                        'Authorised study centre of Tamil Nadu Open University (TNOU)',
                        'Recognised centre of Bharathidasan University (BDU)',
                        'Partner study centre of Alagappa University (ALU)',
                        'Affiliated with UGC-DEB recognised distance education',
                    ],
                ],
            ],
            'founder' => [
                'message' => [
                    'name' => 'Founder',
                    'role' => 'Founder',
                    'message' => 'KSC was founded in Karur with a single conviction: no learner should be denied a recognised degree just because they cannot relocate or attend regular college. Our mission is to make open and distance education easy, affordable and trustworthy for every aspirant in the region.',
                    'image' => '/assets/messages/founder.svg',
                ],
            ],
            'chairman' => [
                'message' => [
                    'name' => 'Chairman',
                    'role' => 'Chairman',
                    'message' => 'At KSC we believe in standing with the community, for the community. Every student who walks in receives the same standard of honest guidance, complete support and personal attention — from the first enquiry to the day their degree is conferred.',
                    'image' => '/assets/messages/chairman.svg',
                ],
            ],
            'curriculum' => [
                'content' => [
                    'intro' => 'Every affiliated university follows its own curriculum structure, examination pattern and syllabus. As a study centre we help you understand what to study, how it is assessed and where to find the official syllabus.',
                    'points' => [
                        ['title' => 'Self-Learning Material (SLM)', 'description' => 'Each course is built around printed or digital Self-Learning Material written by the university\'s academic wing. You prepare from these units at your own pace.'],
                        ['title' => 'Semester vs Non-Semester', 'description' => 'Semester-pattern courses are assessed at the end of each semester; non-semester (yearly) courses are assessed once a year. Your programme table on the Academic page shows the pattern for each course.'],
                        ['title' => 'Assignments & Internal Components', 'description' => 'Courses may include assignments or internal components that contribute to the final grade, apart from the written university examination.'],
                        ['title' => 'Practical / Passed-Out Subjects', 'description' => 'Science and vocational courses include practical-oriented components. Practical records are evaluated by the university during examinations.'],
                        ['title' => 'Official Syllabus Downloads', 'description' => 'The full syllabus for every programme is published by the respective university. Use the syllabus links below to download the PDFs for the programme you are interested in.'],
                    ],
                    'note' => 'This page links out to the official university syllabus PDFs for reference. If a link is missing or out of date, contact our centre for the latest copy.',
                ],
            ],
            'contact' => [
                'reach_centre' => [
                    'kicker' => 'Get in Touch',
                    'title' => 'Reach the centre',
                    'image' => '/assets/user-photos/branch-exterior.jpg',
                    'mapEmbedUrl' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15664.269411986427!2d78.0772274!3d10.9575936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2fa1d5292eb5%3A0x6d8b2d4b9fa37b12!2sKarur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000',
                    'items' => [
                        ['icon' => 'MapPin', 'title' => 'Visit us', 'value' => 'M.R.S. Plaza, 3rd Floor, 57-59, J-S-PS Complex, Near Mini Bus Stand, Karur - 1', 'link' => null, 'button_label' => null],
                        ['icon' => 'Phone', 'title' => 'Call us', 'value' => '99651 07404', 'link' => 'tel:9965107404', 'button_label' => null],
                        ['icon' => 'MessageCircle', 'title' => 'WhatsApp', 'value' => '', 'link' => 'https://wa.me/919965107404?text=Hello%20KARUR%20STUDY%20CENTER%2C%20I%20have%20a%20question%20about%20admissions.', 'button_label' => 'Chat on WhatsApp (919965107404)'],
                        ['icon' => 'Mail', 'title' => 'Email', 'value' => 'Karurstudycentre1@gmail.com', 'link' => 'mailto:Karurstudycentre1@gmail.com', 'button_label' => null],
                    ],
                ],
                'enquiry_form' => [
                    'kicker' => 'Send an Enquiry',
                    'title' => 'Tell us what you\'re looking for',
                    'subtitle' => 'Fill in the form and we\'ll get back to you with programme options and admission guidance.',
                    'submitLabel' => 'Send Enquiry',
                ],
                'contact_fields' => [
                    ['name' => 'name', 'label' => 'Full Name', 'type' => 'text', 'placeholder' => 'Your full name', 'required' => true],
                    ['name' => 'phone', 'label' => 'Phone Number', 'type' => 'tel', 'placeholder' => '10-digit mobile number', 'required' => true],
                    ['name' => 'email', 'label' => 'Email Address', 'type' => 'email', 'placeholder' => 'you@example.com', 'required' => false],
                    [
                        'name' => 'programme',
                        'label' => 'Programme Interested In',
                        'type' => 'select',
                        'placeholder' => 'Select a programme category…',
                        'required' => true,
                        'options' => [
                            'UG (Undergraduate)',
                            'PG (Postgraduate)',
                            'Diploma',
                            'Certificate',
                            'Vocational / Skill Development',
                            'Short Term Course',
                            'Not sure yet — need guidance',
                        ],
                    ],
                    ['name' => 'message', 'label' => 'Message', 'type' => 'textarea', 'placeholder' => 'How can we help you?', 'required' => false],
                ],
            ],
            'admissions' => [
                'header' => [
                    'kicker' => 'Admissions',
                    'title' => 'Admissions — Academic Year 2026',
                    'description' => 'Apply for UG, PG, Diploma, Certificate, Vocational and Short-Term programmes through our centre. We guide you through every step — from form to study material.',
                ],
                'eligibility_summary' => [
                    ['level' => 'UG Programmes', 'detail' => 'Pass in Higher Secondary (10+2). Science courses need the corresponding core subject in 10+2 (e.g. Mathematics for B.Sc. Maths / BCA).'],
                    ['level' => 'PG Programmes', 'detail' => 'A relevant Bachelor\'s degree (e.g. B.Sc. Chemistry for M.Sc. Chemistry). Specific prerequisites appear under each course on the Academic page.'],
                    ['level' => 'Diploma / Certificate / Vocational', 'detail' => 'Varies by programme — 10th pass (SSLC) is sufficient for most. Confirm your case with our counsellors.'],
                    ['level' => 'Distance & Open learning', 'detail' => 'Programmes are UGC-DEB recognised where applicable; no regular attendance required — study from home with our support.'],
                ],
            ],
            'exam_update' => [
                'header' => [
                    'kicker' => 'Exam Update',
                    'title' => 'Examinations, Hall Tickets & Timetables',
                    'description' => 'Stay on top of your exams. Pick your university below to jump to hall-ticket portals and timetable downloads.',
                    'supportNote' => 'Need help reading your hall ticket or understanding your timetable? Visit the centre or message us on WhatsApp during working hours.',
                ],
            ],
        ];

        foreach ($pages as $pageSlug => $sections) {
            foreach ($sections as $sectionKey => $content) {
                PageContent::updateOrCreate(
                    ['page_slug' => $pageSlug, 'section_key' => $sectionKey],
                    ['content' => $content]
                );
            }
        }
    }

    /* ---------------------------------------------------------------------- */
    private function universityData(): array
    {
        return [
            [
                'slug' => 'alagappa',
                'name' => 'Alagappa University',
                'short_name' => 'Alagappa University',
                'academic_year' => '2026',
                'pattern' => 'Semester Pattern',
                'recognition' => 'State University, Karaikudi · Centre for Distance and Online Education (CDOE) · UGC-DEB approved',
                'address' => 'Alagappa Nagar, Karaikudi – 630003, Tamil Nadu',
                'website' => 'www.alagappauniversity.ac.in',
                'logo' => 'https://upload.wikimedia.org/wikipedia/en/e/ec/Alagappa_University_logo.png',
                'exam' => [
                    'note' => 'Alagappa University publishes hall tickets and exam time-tables on its official MIS/distance student portal for CDOE learners.',
                    'hallTicketUrl' => 'https://mis.alagappauniversity.ac.in/distance/student_main.php',
                    'timetableUrl' => '/pdf/ALU-CDOE-Prospectus-AY-2026.pdf',
                    'syllabusUrl' => 'https://www.alagappauniversity.ac.in',
                ],
                'categories' => [
                    ['slug' => 'ug', 'label' => 'UG Programmes', 'count' => 7, 'note' => 'Duration: 3 Years · A pass in HSC (10+2), or 3-year Diploma, or ITI (2-year programme)', 'programmes' => [
                        ['name' => 'B.A. Tamil', 'medium' => 'Tamil', 'pattern' => 'Semester', 'eligibility' => 'A pass in HSC (10+2) / 3-year Diploma / ITI (2-year programme)'],
                        ['name' => 'B.A. English', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in HSC (10+2) / 3-year Diploma / ITI (2-year programme)'],
                        ['name' => 'B.B.A.', 'medium' => 'English & Tamil', 'pattern' => 'Semester', 'eligibility' => 'A pass in HSC (10+2) / 3-year Diploma / ITI (2-year programme)'],
                        ['name' => 'B.Com', 'medium' => 'English & Tamil', 'pattern' => 'Semester', 'eligibility' => 'A pass in HSC (10+2) / 3-year Diploma / ITI (2-year programme)'],
                        ['name' => 'B.Com (Computer Application)', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in HSC (10+2) / 3-year Diploma / ITI (2-year programme)'],
                        ['name' => 'B.Sc. Mathematics', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in HSC (10+2) / 3-year Diploma with Mathematics'],
                        ['name' => 'B.Sc. Computer Science', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in HSC (10+2) / 3-year Diploma with Mathematics'],
                    ]],
                    ['slug' => 'pg', 'label' => 'PG Programmes', 'count' => 16, 'note' => 'Duration: 2 Years · Bachelor Degree from a recognized university (specific prerequisites noted per course)', 'programmes' => [
                        ['name' => 'M.A. Tamil', 'medium' => 'Tamil', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree with Tamil as a course'],
                        ['name' => 'M.A. English', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree with English as a course'],
                        ['name' => 'M.A. History', 'medium' => 'English & Tamil', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree from a recognized university'],
                        ['name' => 'M.A. Economics', 'medium' => 'English & Tamil', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree from a recognized university'],
                        ['name' => 'Master of Social Work (MSW)', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree from a recognized university'],
                        ['name' => 'M.Sc. Mathematics', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Mathematics / Applied Mathematics'],
                        ['name' => 'M.Sc. Computer Science', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree with Mathematics at +2 Level'],
                        ['name' => 'M.Sc. Information Technology', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree from a recognized university'],
                        ['name' => 'Master of Computer Applications (MCA)', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Mathematics / Statistics / Applied Sciences / Computer Science / IT (OR) B.Sc. Physics / Chemistry / Electronics with Mathematics as ancillary (OR) BCA / B.Com / BBA. Should have studied 10+2+3 pattern with Mathematics / Statistics / Business Mathematics at +2 level.'],
                        ['name' => 'M.Sc. Chemistry', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Chemistry'],
                        ['name' => 'M.Sc. Physics', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Physics'],
                        ['name' => 'M.Sc. Botany', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree in Botany / Plant Science / Plant Biology / Plant Biotechnology'],
                        ['name' => 'M.Sc. Zoology', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree in Zoology / Animal Science / Life Science with Chemistry / Biochemistry / Microbiology / Botany as an ancillary subject'],
                        ['name' => 'M.Com', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree in Commerce / B.Com(CA) / B.Com(CS) / B.Com(CS & CA) / BCS / BBM / BBA'],
                        ['name' => 'M.B.A.', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'Bachelor Degree from a recognized university'],
                        ['name' => 'M.Lib.I.Sc.', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Lib.I.Sc. Degree from a recognized university'],
                    ]],
                    ['slug' => 'diploma', 'label' => 'Diploma Programmes', 'count' => 4, 'note' => 'Duration: 1 Year · Eligibility: 10+2 / 10+3', 'programmes' => [
                        ['name' => 'Montessori Education', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3'],
                        ['name' => 'Computer Applications', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3'],
                        ['name' => 'Artificial Intelligence and Machine Learning', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3 with Mathematics / Statistics / Business Mathematics'],
                        ['name' => 'Cyber Security', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3 with Mathematics / Statistics / Business Mathematics'],
                    ]],
                    ['slug' => 'certificate', 'label' => 'Certificate Programmes', 'count' => 8, 'note' => 'Duration: 6 Months · Eligibility: 10+2 / 10+3', 'programmes' => [
                        ['name' => 'Library & Information Science', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3'],
                        ['name' => 'Office Automation', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3'],
                        ['name' => 'Gender Studies', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3'],
                        ['name' => 'C Programming', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3'],
                        ['name' => 'Computer Fundamentals', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3'],
                        ['name' => 'Web Designing', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3'],
                        ['name' => 'GST', 'medium' => 'English', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3'],
                        ['name' => 'Astrology', 'medium' => 'Tamil', 'pattern' => 'Non-Semester', 'eligibility' => '10+2 / 10+3 · Tamil medium only'],
                    ]],
                ],
            ],

            [
                'slug' => 'bdu',
                'name' => 'Bharathidasan University',
                'short_name' => 'Bharathidasan University',
                'academic_year' => '2026-27',
                'pattern' => 'Semester Pattern',
                'recognition' => 'UGC-DEB approved distance education · Accredited by NAAC',
                'address' => 'Palkalaiperur, Tiruchirappalli – 620024, Tamil Nadu',
                'website' => 'www.bdu.ac.in',
                'logo' => 'https://upload.wikimedia.org/wikipedia/en/b/b3/Bharathidasan_University_logo.png',
                'exam' => [
                    'note' => 'Bharathidasan University publishes hall tickets and semester time-tables on its official university portal for distance-education learners.',
                    'hallTicketUrl' => 'https://bdu.ac.in/cde/ht24w/',
                    'timetableUrl' => '/pdf/BDU-New-Sem-Pattern-Courses.pdf',
                    'syllabusUrl' => 'https://www.bdu.ac.in',
                ],
                'categories' => [
                    ['slug' => 'ug', 'label' => 'UG Courses', 'count' => 18, 'note' => 'Semester Pattern (AY 2026-27) · General eligibility: Pass in 10+2 with subject-specific core requirements as noted', 'programmes' => [
                        ['name' => 'B.A. Tamil', 'medium' => 'Tamil', 'pattern' => 'Semester', 'eligibility' => 'A pass in 10+2 with Tamil as a Language Paper'],
                        ['name' => 'B.A. Economics', 'medium' => 'Tamil', 'pattern' => 'Semester', 'eligibility' => 'A pass in Higher Secondary Examination (10+2)'],
                        ['name' => 'B.A. English', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in Higher Secondary Examination (10+2)'],
                        ['name' => 'B.A. History', 'medium' => 'Tamil', 'pattern' => 'Semester', 'eligibility' => 'A pass in Higher Secondary Examination (10+2)'],
                        ['name' => 'B.A. Public Administration', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in Higher Secondary Examination (10+2)'],
                        ['name' => 'B.A. Political Science', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in Higher Secondary Examination (10+2)'],
                        ['name' => 'B.B.A.', 'medium' => 'Tamil / English', 'pattern' => 'Semester', 'eligibility' => 'A pass in 10+2 with Commerce & Accountancy. 20% of seats reserved for Vocational Stream candidates. Lateral entry (Year 2) for holders of a 3-year Diploma in Commerce / Modern Office Practice.'],
                        ['name' => 'B.Com', 'medium' => 'Tamil / English', 'pattern' => 'Semester', 'eligibility' => 'A pass in 10+2 with Commerce & Accountancy. 20% of seats reserved for Vocational Stream candidates. Lateral entry (Year 2) for holders of a 3-year Diploma in Commerce / Modern Office Practice.'],
                        ['name' => 'B.Com Bank Management', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in Higher Secondary Examination (10+2)'],
                        ['name' => 'B.Sc. Mathematics', 'medium' => 'Tamil / English', 'pattern' => 'Semester', 'eligibility' => '10+2 with Mathematics as one of the core subjects'],
                        ['name' => 'B.Sc. Chemistry', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => '10+2 with Chemistry as one of the core subjects'],
                        ['name' => 'B.Sc. Physics', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => '10+2 with Physics as one of the core subjects'],
                        ['name' => 'B.Sc. Botany', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => '10+2 with Botany or Biology along with Chemistry'],
                        ['name' => 'B.Sc. Zoology', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => '10+2 with Maths, Physics, Chemistry, Biology (OR) Physics, Chemistry, Botany, Zoology (OR) Biology as one of the core subjects'],
                        ['name' => 'B.Sc. Geography', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in Higher Secondary Examination (10+2)'],
                        ['name' => 'B.Sc. Computer Science', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => '10+2 with Computer Science or Mathematics as one of the core subjects'],
                        ['name' => 'B.Sc. Information Technology', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in Higher Secondary Examination (10+2)'],
                        ['name' => 'B.C.A.', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => '10+2 with Mathematics as one of the core subjects'],
                    ]],
                    ['slug' => 'pg', 'label' => 'PG Courses', 'count' => 16, 'note' => 'Semester Pattern (AY 2026-27) · Eligibility in line with the university\'s prescribed UG-degree prerequisite', 'programmes' => [
                        ['name' => 'M.A. Economics', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.A. Economics / Econometrics'],
                        ['name' => 'M.A. English', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.A. English Literature (OR) any UG degree with English as Part-II Language'],
                        ['name' => 'M.A. Tamil', 'medium' => 'Tamil', 'pattern' => 'Semester', 'eligibility' => 'B.A. Tamil / B.Lit / B.A. Applied Tamil / Pulavar Degree (OR) any UG degree with Tamil as Part-I Language'],
                        ['name' => 'M.A. History', 'medium' => 'Tamil / English', 'pattern' => 'Semester', 'eligibility' => 'Any Undergraduate (UG) Degree'],
                        ['name' => 'M.Sc. Mathematics', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Mathematics'],
                        ['name' => 'M.Sc. Chemistry', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Chemistry'],
                        ['name' => 'M.Sc. Physics', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Physics'],
                        ['name' => 'M.Sc. Botany', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Botany'],
                        ['name' => 'M.Sc. Zoology', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Zoology'],
                        ['name' => 'M.Sc. Computer Science', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Computer Science / B.Sc. IT / BCA / Software Development (OR) equivalent degree accepted by the syndicate'],
                        ['name' => 'M.Sc. Geography', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Sc. Geography'],
                        ['name' => 'M.Com', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Com / Bank Management / Computer Applications / Financial Management / B.Com (Applied) / Co-operation / BBA'],
                        ['name' => 'M.A. Human Resource Management', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'Any UG Degree in Arts or Science'],
                        ['name' => 'M.Lib.I.Sc.', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'B.Lib.I.Sc.'],
                        ['name' => 'M.B.A.', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'A pass in a recognised Bachelor\'s Degree'],
                        ['name' => 'M.C.A.', 'medium' => 'English', 'pattern' => 'Semester', 'eligibility' => 'BCA / B.Sc. Computer Science / B.Sc. IT / B.E.(CSE) / B.Tech IT (or) any graduation with Mathematics at 10+2 or graduation level (or) B.Com (CA) with Business Mathematics / Statistics as a core subject'],
                    ]],
                ],
            ],

            [
                'slug' => 'msu',
                'name' => 'Manonmaniam Sundaranar University',
                'short_name' => 'Manonmaniam Sundaranar University',
                'academic_year' => '2026',
                'pattern' => 'Semester / Non-Semester',
                'recognition' => 'State University, Tirunelveli · UGC-DEB Approved',
                'address' => 'Tirunelveli, Tamil Nadu',
                'website' => 'www.msuniv.ac.in',
                'logo' => 'https://upload.wikimedia.org/wikipedia/en/0/0e/Manonmaniam_Sundaranar_University_logo.jpeg',
                'exam' => [
                    'note' => 'Manonmaniam Sundaranar University publishes exam details on its official distance education portal.',
                    'hallTicketUrl' => 'https://www.msuniv.ac.in/Distance-Education',
                    'timetableUrl' => 'https://www.msuniv.ac.in/Distance-Education',
                    'syllabusUrl' => 'https://www.msuniv.ac.in/Distance-Education',
                ],
                'categories' => [
                    ['slug' => 'ug', 'label' => 'UG Programmes', 'count' => 10, 'programmes' => [
                        ['name' => 'B.A. (Hons) Tamil', 'medium' => 'Tamil'],
                        ['name' => 'B.A. (Hons) English', 'medium' => 'English'],
                        ['name' => 'B.A. (Hons) Economics', 'medium' => 'English'],
                        ['name' => 'B.A. History', 'medium' => 'Tamil / English'],
                        ['name' => 'Bachelor of Business Administration', 'medium' => 'Tamil / English'],
                        ['name' => 'B.Com', 'medium' => 'Tamil / English'],
                        ['name' => 'Bachelor of Library & Information Science', 'medium' => 'English'],
                        ['name' => 'B.Sc. Mathematics', 'medium' => 'English'],
                        ['name' => 'B.Sc. Physics', 'medium' => 'English'],
                        ['name' => 'B.Sc. Chemistry', 'medium' => 'English'],
                    ]],
                    ['slug' => 'pg', 'label' => 'PG Programmes', 'count' => 11, 'programmes' => [
                        ['name' => 'M.A. Tamil', 'medium' => 'Tamil'],
                        ['name' => 'M.A. English', 'medium' => 'English'],
                        ['name' => 'M.A. Economics', 'medium' => 'English'],
                        ['name' => 'Master of Library & Information Science', 'medium' => 'English'],
                        ['name' => 'M.A. Journalism & Mass Communication', 'medium' => 'English'],
                        ['name' => 'M.A. History', 'medium' => 'Tamil / English'],
                        ['name' => 'M.Com', 'medium' => 'Tamil / English'],
                        ['name' => 'M.Sc. Mathematics', 'medium' => 'English'],
                        ['name' => 'M.Sc. Physics', 'medium' => 'English'],
                        ['name' => 'M.Sc. Chemistry', 'medium' => 'English'],
                        ['name' => 'M.A. Criminology and Police Science', 'medium' => 'English'],
                    ]],
                    ['slug' => 'diploma', 'label' => 'Diploma & Certificate', 'count' => 4, 'programmes' => [
                        ['name' => 'PGDCA (Post Graduate Diploma in Computer Applications)', 'medium' => 'English'],
                        ['name' => 'Diploma in Yoga for Human Excellence', 'medium' => 'English'],
                        ['name' => 'Certificate Course in Yoga for Human Excellence', 'medium' => 'English'],
                        ['name' => 'Certificate Course in Library and Information Science', 'medium' => 'English'],
                    ]],
                ],
            ],
            [
                'slug' => 'tnou',
                'name' => 'Tamilnadu Open University',
                'short_name' => 'Tamilnadu Open University',
                'academic_year' => '2026',
                'pattern' => 'Semester & Non-Semester depending on programme',
                'recognition' => 'State Open University, Govt. of Tamil Nadu · Approved by UGC-DEB · Accredited NAAC A+',
                'address' => 'No. 577, Anna Salai, Saidapet, Chennai – 600015, Tamil Nadu',
                'website' => 'www.tnou.ac.in',
                'logo' => 'https://upload.wikimedia.org/wikipedia/en/2/23/Tamil_Nadu_Open_University_Logo.png',
                'exam' => [
                    'note' => 'TNOU publishes time-tables and hall tickets on its official student portal several weeks before each examination cycle.',
                    'hallTicketUrl' => 'https://tnou.ac.in/hall-ticket-portal',
                    'timetableUrl' => 'https://tnou.ac.in/exam-time-table',
                    'syllabusUrl' => 'https://tnou.ac.in/syllabus',
                ],
                'categories' => [
                    ['slug' => 'ug', 'label' => 'UG Programmes', 'count' => 14, 'note' => 'Duration: Min 3 Yrs to Max 6 Yrs', 'programmes' => [
                        ['name' => 'B.A. Tamil', 'medium' => 'Tamil', 'pattern' => 'Non-Semester'],
                        ['name' => 'B.A. English', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'B.A. Economics', 'medium' => 'Tamil / English', 'pattern' => 'Semester'],
                        ['name' => 'B.A. History', 'medium' => 'Tamil / English', 'pattern' => 'Semester'],
                        ['name' => 'B.A. Political Science', 'medium' => 'Tamil / English', 'pattern' => 'Semester'],
                        ['name' => 'B.A. Sociology', 'medium' => 'Tamil / English', 'pattern' => 'Semester'],
                        ['name' => 'B.B.A.', 'medium' => 'Tamil / English', 'pattern' => 'Semester'],
                        ['name' => 'B.C.A. & LE', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'B.Com', 'medium' => 'Tamil / English', 'pattern' => 'Semester'],
                        ['name' => 'B.Sc. Chemistry', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'B.Sc. Botany', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'B.Sc. Physics', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'B.Sc. Zoology', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'B.Sc. Mathematics', 'medium' => 'English', 'pattern' => 'Semester'],
                    ]],
                    ['slug' => 'pg', 'label' => 'PG Programmes', 'count' => 14, 'note' => 'Duration: Min 2 Yrs to Max 4 Yrs', 'programmes' => [
                        ['name' => 'M.A. Tamil', 'medium' => 'Tamil', 'pattern' => 'Non-Semester'],
                        ['name' => 'M.A. English', 'medium' => 'English', 'pattern' => 'Non-Semester'],
                        ['name' => 'M.A. History', 'medium' => 'Tamil / English', 'pattern' => 'Semester'],
                        ['name' => 'M.A. Political Science', 'medium' => 'Tamil / English', 'pattern' => 'Semester'],
                        ['name' => 'M.A. Sociology', 'medium' => 'Tamil / English', 'pattern' => 'Semester'],
                        ['name' => 'M.Com', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'M.Sc. Mathematics', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'Master of Social Work (MSW)', 'medium' => 'Tamil / English', 'pattern' => 'Semester'],
                        ['name' => 'M.B.A', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'M.Sc. Zoology', 'medium' => 'English', 'pattern' => 'Non-Semester'],
                        ['name' => 'M.Sc. Physics', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'M.Sc. Botany', 'medium' => 'English', 'pattern' => 'Non-Semester'],
                        ['name' => 'M.Sc. Geography', 'medium' => 'English', 'pattern' => 'Semester'],
                        ['name' => 'M.A. Criminology and Criminal Justice Admin', 'medium' => 'English', 'pattern' => 'Non-Semester'],
                    ]],
                    ['slug' => 'diploma', 'label' => 'Diploma Programmes', 'count' => 11, 'note' => 'Duration: 1 Year', 'programmes' => [
                        ['name' => 'Nutrition and Health Education', 'medium' => 'English'],
                        ['name' => 'Wild Life Tourism', 'medium' => 'English'],
                        ['name' => 'Archaeology and Epigraphy', 'medium' => 'English'],
                        ['name' => 'Tourism and Tour Operations Management', 'medium' => 'English'],
                        ['name' => 'Journalism', 'medium' => 'English'],
                        ['name' => 'Media Arts', 'medium' => 'Tamil'],
                        ['name' => 'Silambam', 'medium' => 'Tamil'],
                        ['name' => 'Tamil Research Methodology', 'medium' => 'Tamil'],
                        ['name' => 'Human Rights', 'medium' => 'Tamil / English'],
                        ['name' => 'International Relations', 'medium' => 'English'],
                        ['name' => 'Fashion Designing and Boutique Management', 'medium' => 'Tamil / English'],
                    ]],
                    ['slug' => 'certificate', 'label' => 'Certificate Programmes', 'count' => 12, 'note' => 'Duration: 6 Months', 'programmes' => [
                        ['name' => 'Course in Conservation Techniques', 'medium' => 'English'],
                        ['name' => 'Modern Techniques and Technology in Teaching Mathematics', 'medium' => 'English'],
                        ['name' => 'ICT in Functional Tamil', 'medium' => 'Tamil'],
                        ['name' => 'Brain Based Learning Techniques', 'medium' => 'English'],
                        ['name' => 'Advanced Technological Applications in Teaching Mathematics', 'medium' => 'English'],
                        ['name' => 'Adolescence Education', 'medium' => 'English'],
                        ['name' => 'BS-VI: Emission Standards', 'medium' => 'English'],
                        ['name' => 'Environmental Conservation', 'medium' => 'English'],
                        ['name' => 'Aquaculture', 'medium' => 'English'],
                        ['name' => 'Thirukural', 'medium' => 'Tamil'],
                        ['name' => 'Enterpreneurship Development', 'medium' => 'English'],
                        ['name' => 'Silambam', 'medium' => 'Tamil'],
                    ]],
                    ['slug' => 'vocational', 'label' => 'Vocational Diploma Programmes', 'count' => 11, 'note' => 'Duration: 1 Year', 'programmes' => [
                        ['name' => 'Office-Automation', 'medium' => 'Tamil / English'],
                        ['name' => 'In-Design', 'medium' => 'Tamil / English'],
                        ['name' => 'Vehicle Mechanic', 'medium' => 'Tamil / English'],
                        ['name' => 'Refrigeration & AC Technician', 'medium' => 'Tamil / English'],
                        ['name' => 'Fashion Design & Garment Making', 'medium' => 'Tamil / English'],
                        ['name' => 'Beauty Therapist', 'medium' => 'Tamil / English'],
                        ['name' => 'Acupressure Therapist', 'medium' => 'Tamil / English'],
                        ['name' => 'General Duty Assistant', 'medium' => 'Tamil / English'],
                        ['name' => 'Industrial Fitter', 'medium' => 'English'],
                        ['name' => 'Welding Technology', 'medium' => 'English'],
                        ['name' => 'Early Childhood Care & Education', 'medium' => 'Tamil / English'],
                    ]],
                    ['slug' => 'adv-vocational', 'label' => 'Adv. Vocational Diploma Programmes', 'count' => 2, 'note' => 'Duration: 2 Years', 'programmes' => [
                        ['name' => 'General Duty Assistant', 'medium' => 'Tamil / English'],
                        ['name' => 'General Duty Assistant (Lateral Entry)', 'medium' => 'Tamil / English'],
                    ]],
                    ['slug' => 'short-term', 'label' => 'Short Term Programmes', 'count' => 12, 'note' => 'Duration: 3 Months', 'programmes' => [
                        ['name' => 'Logistics and Supply Chain Management', 'medium' => 'English'],
                        ['name' => 'Life Skills and Personality Development', 'medium' => 'English'],
                        ['name' => 'Thirukural', 'medium' => 'Tamil'],
                        ['name' => 'Road Safety & First Aid', 'medium' => 'Tamil'],
                        ['name' => 'Office Automation', 'medium' => 'Tamil / English'],
                        ['name' => 'Basic Computer Operations', 'medium' => 'Tamil / English'],
                        ['name' => 'Industrial Safety & Security', 'medium' => 'English'],
                        ['name' => 'Cold Storage Management', 'medium' => 'English'],
                        ['name' => 'Beautician', 'medium' => 'English'],
                        ['name' => 'Social Justice', 'medium' => 'Tamil / English'],
                        ['name' => 'Dr. B. R. Ambedkar Thoughts', 'medium' => 'Tamil / English'],
                        ['name' => 'Theatre Arts', 'medium' => 'Tamil'],
                    ]],
                ],
            ],

        ];
    }
}
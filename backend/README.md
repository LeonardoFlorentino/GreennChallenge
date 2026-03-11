# Backend – Greenn Challenge

<a href="https://greennchallenge-production.up.railway.app/api/v1/" target="_blank">
	<img src="https://img.shields.io/badge/railway-backend-success?logo=railway&labelColor=222&color=43b581" alt="Railway Backend Deploy" />
</a>

<p align="center">
	<b>Robust, scalable, and high-performance backend for producer management</b><br/>
	<img src="https://img.shields.io/badge/Laravel-10.x-ff2d20?logo=laravel"/>
	<img src="https://img.shields.io/badge/PHP-8.x-777bb4?logo=php"/>
	<img src="https://img.shields.io/badge/Eloquent%20ORM-ActiveRecord-4B5563?logo=laravel"/>
	<img src="https://img.shields.io/badge/Sanctum-Auth-4B5563?logo=laravel"/>
	<img src="https://img.shields.io/badge/PHPUnit-Test-4B5563?logo=php"/>
</p>

---

## 🚀 How to Run the Backend

```bash
cd backend
composer install
cp .env.example .env
# Configure the .env file as needed (database, mail, etc)
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The API will be available at `http://localhost:8000`.

---

## 🔑 Authentication

- Uses Laravel Sanctum for token-based authentication.
- Protected endpoints require the token in the header: `Authorization: Bearer <token>`.

---

## 📚 Main Endpoints

- `POST /api/login` – Login and obtain token
- `POST /api/logout` – Logout
- `GET /api/producers` – List all producers
- `POST /api/producers` – Create a new producer
- `PUT /api/producers/{id}` – Update a producer
- `DELETE /api/producers/{id}` – Delete a producer
- `GET /api/producers/ranking` – List producers ordered by score

---

## 🏆 Score Calculation

The score for each producer is calculated using the following formula:

$$
S_{year} = direct\_sales\_last\_year + indirect\_sales\_last\_year
$$

$$
S_{month} = direct\_sales\_last\_month + indirect\_sales\_last\_month
$$

$$
F = followers\_instagram
$$

$$
T =
\begin{cases}
1 \text{ if } is\_trending = true \\
0 \text{ if } is\_trending = false
\end{cases}
$$

$$
score_{month} =
\min(100, \frac{S_{month}}{5\,000\,000} \times 100)
$$

$$
score_{year} =
\min(100, \frac{S_{year}}{100\,000\,000} \times 100)
$$

$$
score_{followers} =
\frac{\log_{10}(F+1)}{\log_{10}(20\,000\,000)} \times 100
$$

$$
score_{trending} = T \times 100
$$

$$
\text{relevance}_{\text{score}} =
0.30\,\text{score}_{\text{month}} +
0.25\,\text{score}_{\text{year}} +
0.25\,\text{score}_{\text{followers}} +
0.20\,\text{score}_{\text{trending}}
$$

- **Successful deliveries:** Total deliveries completed without issues.
- **Average rating:** Average of customer ratings (0 to 5).
- **Complaints:** Total complaints registered for the producer.

> Adjust the formula above according to your project's real logic!

---

## 🧪 Automated Tests

Run the tests with:

```bash
php artisan test
```

Example of successful test output:

```
 PASS  Tests\Feature\ProducerTest
 ✓ it lists all producers
 ✓ it creates a new producer
 ✓ it updates a producer
 ✓ it deletes a producer
 ✓ it calculates the score correctly

 Tests:  5 passed
 Time:   1.23s
```

---

## 📄 Structure

- `app/Models/Producer.php` – Main producer model
- `app/Http/Controllers/ProducerController.php` – Endpoint logic
- `database/seeders/ProducerSeeder.php` – Example data
- `routes/api.php` – API routes

---

## 👩‍💻 Author

Developed by Leonardo Florentino Fernandes for the Greenn technical challenge.
